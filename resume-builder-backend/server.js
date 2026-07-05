const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY is not set — AI bullet-point generation will fail.');
}

const app = express();

// Trust proxy if behind a reverse proxy (e.g., Render, Heroku, Nginx)
app.set('trust proxy', 1);

// Global Security Middleware
app.use(helmet());

// ==========================================
// DYNAMIC VERCEL & LOCAL CORS CONFIGURATION
// ==========================================
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or curl)
      if (!origin) return callback(null, true);

      // Dynamically accept localhost AND any Vercel preview or production domain
      const isAllowed =
        origin.startsWith('http://localhost:5173') ||
        origin.startsWith('http://localhost:5174') ||
        origin.includes('.vercel.app') ||
        origin === process.env.CLIENT_URL;

      if (isAllowed) {
        callback(null, true);
      } else {
        console.error(`❌ CORS Blocked Origin: ${origin}`);
        callback(new Error('Not allowed by CORS policy'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for AI endpoints (prevent quota exhaustion)
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 AI requests per window
  message: { message: 'Too many AI requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'AI Resume Builder API is running 🚀' });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/ai', aiLimiter, require('./routes/aiRoutes'));

// Error Handling Middleware (Must be registered after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Graceful shutdown handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
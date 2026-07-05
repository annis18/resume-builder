import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-6 text-center">
    <div>
      <p className="font-mono text-sm text-ink-muted mb-4">404</p>
      <h1 className="font-display text-3xl text-ink mb-4">Page not found</h1>
      <Link to="/" className="text-signal underline underline-offset-4">
        Back to safety
      </Link>
    </div>
  </div>
);

export default NotFound;

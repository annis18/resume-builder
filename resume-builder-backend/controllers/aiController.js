const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini's structured-output mode: constrains the model to return valid JSON
// matching this shape, instead of freeform text we'd have to regex out of a
// paragraph. Plain array of strings — one per bullet point.
const BULLET_POINTS_SCHEMA = {
  type: 'array',
  items: { type: 'string' },
};

const SYSTEM_INSTRUCTION =
  'You are an expert resume writer and ATS (Applicant Tracking System) ' +
  'optimization specialist. You write concise, high-impact resume bullet points.';

// Shared by both generateBulletPoints (experience) and generateProjectBullets
// (projects) — only the prompt text differs between the two contexts, so the
// actual Gemini call, response parsing, and error handling live in one place.
// Throws an Error with a `.statusCode` attached; callers set res.status()
// from that before re-throwing, so Express 5 still forwards it to
// errorMiddleware exactly like every other thrown error in this API.
const requestBulletPoints = async (prompt) => {
  let response;
  try {
    response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: BULLET_POINTS_SCHEMA,
        temperature: 0.8,
      },
    });
  } catch (apiError) {
    console.error('Gemini API error:', apiError.message);
    const err = new Error('The AI service is temporarily unavailable. Please try again in a moment.');
    err.statusCode = 502;
    throw err;
  }

  let bulletPoints;
  try {
    bulletPoints = JSON.parse(response.text);
  } catch (parseError) {
    const err = new Error('The AI service returned an unexpected format. Please try again.');
    err.statusCode = 502;
    throw err;
  }

  if (!Array.isArray(bulletPoints) || bulletPoints.length === 0) {
    const err = new Error('The AI service returned no usable bullet points. Please try again.');
    err.statusCode = 502;
    throw err;
  }

  // Defensive trim in case the model returns more than 3 despite the schema/prompt
  return bulletPoints.slice(0, 3);
};

const buildExperiencePrompt = (jobTitle, companyName) => `Generate exactly 3 professional resume bullet points for this role:

Job Title: ${jobTitle}
Company: ${companyName}

Guidelines:
- Start each bullet with a strong action verb (e.g., "Led," "Developed," "Streamlined," "Delivered").
- Where a bullet would benefit from a quantified result (%, $, time saved, team size), use a bracketed placeholder like "[X]%" rather than inventing a specific figure — the user will fill in their real numbers.
- Keep each bullet to one line, ideally under 25 words.
- Use terminology and keywords an ATS would associate with this job title.
- Do not use personal pronouns (I, my, me).`;

const buildProjectPrompt = (title, technologies) => `Generate exactly 3 professional resume bullet points for this project:

Project: ${title}
Technologies used: ${technologies}

Guidelines:
- Start each bullet with a strong action verb (e.g., "Built," "Designed," "Implemented," "Architected").
- Reference specific technologies from the list above where it reads naturally.
- Describe what the project does and a concrete technical challenge it solves.
- Where a bullet would benefit from a quantified result (%, users, latency, performance), use a bracketed placeholder like "[X]%" rather than inventing a specific figure — the user will fill in their real numbers.
- Keep each bullet to one line, ideally under 25 words.
- Do not use personal pronouns (I, my, me).`;

// @desc    Generate 3 ATS-friendly resume bullet points for a role
// @route   POST /api/ai/generate-bullets
// @access  Private
const generateBulletPoints = async (req, res) => {
  const { jobTitle, companyName } = req.body;

  if (!jobTitle || !companyName) {
    res.status(400);
    throw new Error('Please provide both a job title and company name');
  }

  if (jobTitle.length > 100 || companyName.length > 100) {
    res.status(400);
    throw new Error('Job title and company name must be under 100 characters');
  }

  try {
    const bulletPoints = await requestBulletPoints(buildExperiencePrompt(jobTitle, companyName));
    res.status(200).json({ bulletPoints });
  } catch (err) {
    res.status(err.statusCode || 500);
    throw err;
  }
};

// @desc    Generate 3 ATS-friendly resume bullet points for a project
// @route   POST /api/ai/generate-project-bullets
// @access  Private
const generateProjectBullets = async (req, res) => {
  const { title, technologies } = req.body;

  if (!title || !technologies) {
    res.status(400);
    throw new Error('Please provide both a project title and the technologies used');
  }

  if (title.length > 100 || technologies.length > 150) {
    res.status(400);
    throw new Error('Project title and technologies must be a reasonable length');
  }

  try {
    const bulletPoints = await requestBulletPoints(buildProjectPrompt(title, technologies));
    res.status(200).json({ bulletPoints });
  } catch (err) {
    res.status(err.statusCode || 500);
    throw err;
  }
};

module.exports = { generateBulletPoints, generateProjectBullets };

const mongoose = require('mongoose');

// One work-experience entry. Kept as its own schema (rather than a plain
// inline object) so Mongoose gives each entry its own _id — that's what
// lets the frontend edit or delete a single experience block later without
// resending the whole array.
const experienceSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: [true, 'Job title is required'], trim: true },
    companyName: { type: String, required: [true, 'Company name is required'], trim: true },
    location: { type: String, trim: true },
    // Stored as strings ("Jan 2023", "Present") rather than Date objects —
    // resumes rarely need exact days, and this sidesteps Date-vs-"Present" issues.
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    currentlyWorking: { type: Boolean, default: false },
    // AI-generated or manually written bullet points (Phase 3 fills this array)
    description: { type: [String], default: [] },
  },
  { _id: true }
);

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: [true, 'Institution is required'], trim: true },
    degree: { type: String, required: [true, 'Degree is required'], trim: true },
    fieldOfStudy: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    grade: { type: String, trim: true }, // GPA, percentage, or honors
  },
  { _id: true }
);

// Personal, academic, or side projects. Same subdocument pattern as
// experience/education — own _id per entry, own bullet-point array that
// Phase 3's AI generator can also fill (via a project-specific prompt).
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Project title is required'], trim: true },
    technologies: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    link: { type: String, trim: true },
    bulletPoints: { type: [String], default: [] },
  },
  { _id: true }
);

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Certification title is required'], trim: true },
    issuer: { type: String, trim: true },
    date: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: true }
);

// Embedded, not an array — every resume has exactly one of these
const personalInfoSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, default: '' },
    jobTitle: { type: String, trim: true, default: '' }, // professional headline
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    website: { type: String, trim: true, default: '' },
    summary: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // fast lookups for "all resumes belonging to this user"
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Untitled Resume', // lets a user save multiple resumes, e.g. per application
    },
    templateId: {
      type: String,
      default: 'modern', // which layout was chosen — wired up in Phase 4
    },
    personalInfo: {
      type: personalInfoSchema,
      default: () => ({}),
    },
    experience: [experienceSchema],
    education: [educationSchema],
    projects: {
      type: [projectSchema],
      default: [], // explicit — existing resumes saved before this field existed still hydrate as []
    },
    certifications: {
      type: [certificationSchema],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);

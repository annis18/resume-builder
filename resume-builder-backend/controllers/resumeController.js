const Resume = require('../models/Resume');

// @desc    Create a new resume for the logged-in user
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  const { title, templateId, personalInfo, experience, education, projects, certifications, skills } =
    req.body;

  const resume = await Resume.create({
    user: req.user._id,
    title,
    templateId,
    personalInfo,
    experience,
    education,
    projects,
    certifications,
    skills,
  });

  res.status(201).json(resume);
};

// @desc    Get all resumes belonging to the logged-in user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.status(200).json(resumes);
};

// @desc    Get a single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  // Same 404 for "doesn't exist" and "exists but isn't yours" — never confirm
  // to an unauthorized caller that a given resume ID is valid
  if (!resume || resume.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Resume not found');
  }

  res.status(200).json(resume);
};

// @desc    Update a resume — supports updating individual sections
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume || resume.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Resume not found');
  }

  const { title, templateId, personalInfo, experience, education, projects, certifications, skills } =
    req.body;

  // Fields are picked explicitly (never `Object.assign(resume, req.body)`)
  // so a request body can't sneak in a `user` field and reassign ownership.
  if (title !== undefined) resume.title = title;
  if (templateId !== undefined) resume.templateId = templateId;
  if (personalInfo !== undefined) {
    // Shallow-merge so updating just one field (e.g. summary) doesn't wipe
    // the rest of personalInfo — the editor can PUT a partial object.
    resume.personalInfo = { ...resume.personalInfo.toObject(), ...personalInfo };
  }
  if (experience !== undefined) resume.experience = experience; // full section replace
  if (education !== undefined) resume.education = education;
  if (projects !== undefined) resume.projects = projects;
  if (certifications !== undefined) resume.certifications = certifications;
  if (skills !== undefined) resume.skills = skills;

  // .save() (rather than findByIdAndUpdate) so schema validators and the
  // subdocument _id generation both run automatically.
  const updatedResume = await resume.save();

  res.status(200).json(updatedResume);
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume || resume.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Resume not found');
  }

  await resume.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Resume removed' });
};

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};

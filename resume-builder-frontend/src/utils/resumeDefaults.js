export const createBlankExperience = () => ({
  key: crypto.randomUUID(),
  jobTitle: '',
  companyName: '',
  location: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  description: [],
});

export const createBlankEducation = () => ({
  key: crypto.randomUUID(),
  institution: '',
  degree: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
  grade: '',
});

export const createBlankProject = () => ({
  key: crypto.randomUUID(),
  title: '',
  technologies: '',
  startDate: '',
  endDate: '',
  link: '',
  bulletPoints: [],
});

export const createBlankCertification = () => ({
  key: crypto.randomUUID(),
  title: '',
  issuer: '',
  date: '',
  description: '',
});

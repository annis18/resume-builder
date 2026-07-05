import { toHref } from '../../../utils/formatLink';

const SectionHeading = ({ children }) => (
  <h2 className="font-serif text-sm font-bold uppercase tracking-widest text-ink border-b border-ink pb-1 mb-3">
    {children}
  </h2>
);

const DateRange = ({ startDate, endDate, currentlyWorking }) => {
  const end = currentlyWorking ? 'Present' : endDate;
  if (!startDate && !end) return null;
  return (
    <p className="text-xs text-ink-muted shrink-0 ml-4 whitespace-nowrap">
      {startDate}
      {startDate && end ? ' – ' : ''}
      {end}
    </p>
  );
};

const ClassicTemplate = ({ resume }) => {
  const { personalInfo, experience, education, projects = [], certifications = [], skills } = resume;

  const contactLine = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.address,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="font-serif text-sm leading-relaxed">
      <header className="text-center mb-6 pb-4 border-b-2 border-ink">
        <h1 className="text-2xl tracking-wide text-ink uppercase">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="text-ink-muted mt-1 font-body text-sm">{personalInfo.jobTitle}</p>}
        {contactLine.length > 0 && (
          <p className="text-xs text-ink-muted mt-2 font-body">{contactLine.join('   |   ')}</p>
        )}
      </header>

      {personalInfo.summary && (
        <p className="mb-6 text-center italic text-ink-muted font-body">{personalInfo.summary}</p>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Professional Experience</SectionHeading>
          <div className="space-y-4 font-body">
            {experience.map((exp, i) => (
              <div key={exp._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-semibold text-ink">
                    {exp.jobTitle}
                    {exp.companyName && ` — ${exp.companyName}`}
                  </p>
                  <DateRange
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    currentlyWorking={exp.currentlyWorking}
                  />
                </div>
                {exp.location && <p className="text-xs text-ink-muted">{exp.location}</p>}
                {exp.description.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 space-y-0.5">
                    {exp.description.filter(Boolean).map((bullet, bi) => (
                      <li key={bi}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Projects</SectionHeading>
          <div className="space-y-4 font-body">
            {projects.map((proj, i) => (
              <div key={proj._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-semibold text-ink">
                    {proj.title}
                    {proj.link && (
                      <a href={toHref(proj.link)} className="font-normal text-ink-muted ml-2 text-xs">
                        {proj.link}
                      </a>
                    )}
                  </p>
                  <DateRange startDate={proj.startDate} endDate={proj.endDate} />
                </div>
                {proj.technologies && <p className="text-xs text-ink-muted">{proj.technologies}</p>}
                {proj.bulletPoints.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 space-y-0.5">
                    {proj.bulletPoints.filter(Boolean).map((bullet, bi) => (
                      <li key={bi}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-3 font-body">
            {education.map((edu, i) => (
              <div key={edu._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-semibold text-ink">
                    {edu.degree}
                    {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                  </p>
                  <DateRange startDate={edu.startDate} endDate={edu.endDate} />
                </div>
                <p className="text-xs text-ink-muted">
                  {edu.institution}
                  {edu.grade && ` · ${edu.grade}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Certifications</SectionHeading>
          <div className="space-y-2 font-body">
            {certifications.map((cert, i) => (
              <div key={cert._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-semibold text-ink">
                    {cert.title}
                    {cert.issuer && ` — ${cert.issuer}`}
                  </p>
                  {cert.date && <p className="text-xs text-ink-muted shrink-0 ml-4">{cert.date}</p>}
                </div>
                {cert.description && <p className="text-xs text-ink-muted">{cert.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <SectionHeading>Skills</SectionHeading>
          <p className="font-body text-center">{skills.join('   ·   ')}</p>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;

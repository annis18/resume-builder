import { toHref } from '../../../utils/formatLink';

// No borders anywhere except one hairline under the header. Separation
// between sections comes entirely from vertical space, not lines — that's
// the whole point of this template.
const SectionHeading = ({ children }) => (
  <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink-muted mb-4">{children}</h2>
);

const DateRange = ({ startDate, endDate, currentlyWorking }) => {
  const end = currentlyWorking ? 'Present' : endDate;
  if (!startDate && !end) return null;
  return (
    <p className="text-xs text-ink-muted shrink-0 ml-4 whitespace-nowrap font-light">
      {startDate}
      {startDate && end ? ' – ' : ''}
      {end}
    </p>
  );
};

// Dash-marker bullets read as more refined than default browser dots, and
// keep with the "zero heavy visual weight" brief.
const DashList = ({ items }) => (
  <ul className="space-y-1.5 mt-2">
    {items.map((item, i) => (
      <li key={i} className="pl-4 relative text-ink-muted before:content-['—'] before:absolute before:left-0">
        {item}
      </li>
    ))}
  </ul>
);

const MinimalTemplate = ({ resume }) => {
  const { personalInfo, experience, education, projects = [], certifications = [], skills } = resume;

  const contactLine = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.address,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="font-body text-sm leading-[1.7] text-ink">
      <header className="mb-6 pb-6 border-b border-rule/60">
        <h1 className="text-2xl font-light tracking-tight text-ink">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="text-ink-muted mt-1 font-light">{personalInfo.jobTitle}</p>}
        {contactLine.length > 0 && (
          <p className="text-xs text-ink-muted mt-3 font-light">{contactLine.join('   ')}</p>
        )}
      </header>

      {personalInfo.summary && <p className="mb-10 text-ink-muted font-light">{personalInfo.summary}</p>}

      {experience.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={exp._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-medium text-ink">{exp.jobTitle}</p>
                  <DateRange
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    currentlyWorking={exp.currentlyWorking}
                  />
                </div>
                <p className="text-ink-muted text-xs font-light">
                  {exp.companyName}
                  {exp.location && `   ${exp.location}`}
                </p>
                {exp.description.filter(Boolean).length > 0 && (
                  <DashList items={exp.description.filter(Boolean)} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Projects</SectionHeading>
          <div className="space-y-6">
            {projects.map((proj, i) => (
              <div key={proj._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-medium text-ink">{proj.title}</p>
                  <DateRange startDate={proj.startDate} endDate={proj.endDate} />
                </div>
                <p className="text-ink-muted text-xs font-light">
                  {proj.technologies}
                  {proj.link && (
                    <>
                      {proj.technologies && '   '}
                      <a href={toHref(proj.link)} className="underline underline-offset-2">
                        {proj.link}
                      </a>
                    </>
                  )}
                </p>
                {proj.bulletPoints.filter(Boolean).length > 0 && (
                  <DashList items={proj.bulletPoints.filter(Boolean)} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={edu._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-medium text-ink">
                    {edu.degree}
                    {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                  </p>
                  <DateRange startDate={edu.startDate} endDate={edu.endDate} />
                </div>
                <p className="text-ink-muted text-xs font-light">
                  {edu.institution}
                  {edu.grade && `   ${edu.grade}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Certifications</SectionHeading>
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div key={cert._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-medium text-ink">{cert.title}</p>
                  {cert.date && <p className="text-xs text-ink-muted font-light shrink-0 ml-4">{cert.date}</p>}
                </div>
                <p className="text-ink-muted text-xs font-light">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <SectionHeading>Skills</SectionHeading>
          <p className="text-ink-muted font-light">{skills.join('   ·   ')}</p>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;

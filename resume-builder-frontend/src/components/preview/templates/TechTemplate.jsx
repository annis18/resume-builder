import { toHref } from '../../../utils/formatLink';

const SectionHeading = ({ children }) => (
  <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink border-b border-rule pb-1.5 mb-3">
    {children}
  </h2>
);

const DateRange = ({ startDate, endDate, currentlyWorking }) => {
  const end = currentlyWorking ? 'Present' : endDate;
  if (!startDate && !end) return null;
  return (
    <p className="font-mono text-[11px] text-ink-muted shrink-0 ml-4 whitespace-nowrap">
      {startDate}
      {startDate && end ? ' – ' : ''}
      {end}
    </p>
  );
};

// Terminal-style triangle markers in the signal color — a small nod to the
// audience without tipping into gimmick.
const BulletList = ({ items }) => (
  <ul className="mt-1.5 space-y-0.5">
    {items.map((item, i) => (
      <li
        key={i}
        className="pl-3.5 relative before:content-['▸'] before:absolute before:left-0 before:text-signal before:text-[10px]"
      >
        {item}
      </li>
    ))}
  </ul>
);

const TechTemplate = ({ resume }) => {
  const { personalInfo, experience, education, projects = [], certifications = [], skills } = resume;

  const contactLine = [personalInfo.email, personalInfo.phone, personalInfo.linkedin, personalInfo.website].filter(
    Boolean
  );

  return (
    <div className="font-body text-[13px] leading-snug text-ink">
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-ink">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="text-ink-muted font-mono text-xs mt-0.5">{personalInfo.jobTitle}</p>}
        {contactLine.length > 0 && (
          <p className="text-xs text-ink-muted mt-1.5 font-mono">{contactLine.join('  //  ')}</p>
        )}
      </header>

      {personalInfo.summary && <p className="mb-5 text-xs">{personalInfo.summary}</p>}

      {/* Tech stack goes right up top — the section a recruiter filtering
          for a specific stack scans for first. True categorized grouping
          (Languages / Frameworks / Tools) would need `skills` to move from
          a flat string array to labeled groups in the schema — flagging
          that as a natural next step rather than guessing at categories
          from plain strings. */}
      {skills.length > 0 && (
        <section className="mb-5">
          <SectionHeading>Tech Stack</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill} className="font-mono text-[11px] bg-canvas px-2 py-0.5 text-ink">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-5">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={exp._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-semibold">
                    {exp.jobTitle}
                    {exp.companyName && <span className="font-normal text-ink-muted"> @ {exp.companyName}</span>}
                  </p>
                  <DateRange
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    currentlyWorking={exp.currentlyWorking}
                  />
                </div>
                {exp.description.filter(Boolean).length > 0 && (
                  <BulletList items={exp.description.filter(Boolean)} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-5">
          <SectionHeading>Projects</SectionHeading>
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div key={proj._id || i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <p className="font-semibold">
                    {proj.title}
                    {proj.link && (
                      <a href={toHref(proj.link)} className="font-mono font-normal text-signal text-[11px] ml-2">
                        {proj.link}
                      </a>
                    )}
                  </p>
                  <DateRange startDate={proj.startDate} endDate={proj.endDate} />
                </div>
                {proj.technologies && <p className="font-mono text-[11px] text-ink-muted">{proj.technologies}</p>}
                {proj.bulletPoints.filter(Boolean).length > 0 && (
                  <BulletList items={proj.bulletPoints.filter(Boolean)} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div key={edu._id || i} className="break-inside-avoid flex justify-between items-baseline gap-2">
                <p>
                  <span className="font-semibold">{edu.degree}</span>
                  {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                  <span className="text-ink-muted"> — {edu.institution}</span>
                  {edu.grade && <span className="font-mono text-[11px] text-ink-muted"> ({edu.grade})</span>}
                </p>
                <DateRange startDate={edu.startDate} endDate={edu.endDate} />
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <SectionHeading>Certifications</SectionHeading>
          <div className="space-y-1.5">
            {certifications.map((cert, i) => (
              <div key={cert._id || i} className="break-inside-avoid flex justify-between items-baseline gap-2">
                <p>
                  <span className="font-semibold">{cert.title}</span>
                  {cert.issuer && <span className="text-ink-muted"> — {cert.issuer}</span>}
                </p>
                {cert.date && <p className="font-mono text-[11px] text-ink-muted shrink-0 ml-4">{cert.date}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TechTemplate;

import type { ResumeData, ThemeSettings } from '../types/resume';

type TemplateProps = {
  resume: ResumeData;
  theme: ThemeSettings;
};

export const TwoColumn = ({ resume, theme }: TemplateProps) => (
  <div style={{ fontFamily: theme.fontFamily, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '16px' }}>
    <aside>
      <section className="section">
        <h1 style={{ fontSize: '24px', fontWeight: 700 }} className="accent">
          {resume.basics.fullName}
        </h1>
        <p style={{ fontSize: '13px', marginTop: '4px' }}>{resume.basics.title}</p>
        <p style={{ fontSize: '11px', marginTop: '6px', color: '#475569' }}>
          {resume.basics.email}
        </p>
        <p style={{ fontSize: '11px', color: '#475569' }}>{resume.basics.phone}</p>
        <p style={{ fontSize: '11px', color: '#475569' }}>{resume.basics.location}</p>
      </section>
      <section className="section">
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Compétences
        </h2>
        <ul>
          {resume.skills.map((skill) => (
            <li key={skill.id} style={{ fontSize: '12px' }}>
              {skill.name} — {skill.level}
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Langues
        </h2>
        <ul>
          {resume.languages.map((lang) => (
            <li key={lang.id} style={{ fontSize: '12px' }}>
              {lang.name} — {lang.level}
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Certifications
        </h2>
        {resume.certifications.map((cert) => (
          <p key={cert.id} style={{ fontSize: '12px', marginTop: '6px' }}>
            {cert.name} · {cert.issuer} ({cert.year})
          </p>
        ))}
      </section>
    </aside>
    <main>
      <section className="section">
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Profil
        </h2>
        <p style={{ fontSize: '12px', marginTop: '6px' }}>{resume.basics.summary}</p>
      </section>
      <section className="section">
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Expériences
        </h2>
        {resume.experiences.map((exp) => (
          <div key={exp.id} style={{ marginTop: '10px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600 }}>{exp.role}</h3>
            <p style={{ fontSize: '11px', color: '#475569' }}>
              {exp.company} · {exp.location} · {exp.startDate} - {exp.endDate}
            </p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>{exp.summary}</p>
          </div>
        ))}
      </section>
      <section className="section">
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Éducation
        </h2>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginTop: '8px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600 }}>{edu.degree}</h3>
            <p style={{ fontSize: '11px', color: '#475569' }}>
              {edu.school} · {edu.startDate} - {edu.endDate}
            </p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>{edu.details}</p>
          </div>
        ))}
      </section>
      {resume.projects.length > 0 && (
        <section className="section">
          <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
            Projets
          </h2>
          {resume.projects.map((project) => (
            <p key={project.id} style={{ fontSize: '12px', marginTop: '6px' }}>
              {project.name} — {project.description}
            </p>
          ))}
        </section>
      )}
    </main>
  </div>
);

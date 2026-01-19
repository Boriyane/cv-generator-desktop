import type { ResumeData, ThemeSettings } from '../types/resume';

type TemplateProps = {
  resume: ResumeData;
  theme: ThemeSettings;
};

export const Executive = ({ resume, theme }: TemplateProps) => (
  <div style={{ fontFamily: theme.fontFamily }}>
    <section className="section" style={{ borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: '12px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 700 }} className="accent">
        {resume.basics.fullName}
      </h1>
      <p style={{ fontSize: '14px', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {resume.basics.title}
      </p>
      <p style={{ fontSize: '12px', marginTop: '6px', color: '#475569' }}>
        {resume.basics.email} · {resume.basics.phone} · {resume.basics.location}
      </p>
    </section>
    <section className="section">
      <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
        Résumé Exécutif
      </h2>
      <p style={{ fontSize: '12px', marginTop: '6px' }}>{resume.basics.summary}</p>
    </section>
    <section className="section">
      <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
        Expériences clés
      </h2>
      {resume.experiences.map((exp) => (
        <div key={exp.id} style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600 }}>{exp.role}</h3>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              {exp.startDate} - {exp.endDate}
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#475569' }}>
            {exp.company} · {exp.location}
          </p>
          <p style={{ fontSize: '12px', marginTop: '4px' }}>{exp.summary}</p>
        </div>
      ))}
    </section>
    <section className="section">
      <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
        Expertise
      </h2>
      <ul>
        {resume.skills.map((skill) => (
          <li key={skill.id} style={{ fontSize: '12px' }}>
            {skill.name} — {skill.level}
          </li>
        ))}
      </ul>
    </section>
    <section className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Formation
        </h2>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginTop: '6px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 600 }}>{edu.degree}</h3>
            <p style={{ fontSize: '11px', color: '#475569' }}>{edu.school}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 style={{ fontSize: '14px', fontWeight: 600 }} className="accent">
          Langues
        </h2>
        {resume.languages.map((lang) => (
          <p key={lang.id} style={{ fontSize: '12px', marginTop: '6px' }}>
            {lang.name} — {lang.level}
          </p>
        ))}
      </div>
    </section>
  </div>
);

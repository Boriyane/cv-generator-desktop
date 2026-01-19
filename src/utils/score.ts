import type { ResumeData } from '../types/resume';

export type ScoreResult = {
  score: number;
  tips: string[];
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export const calculateScore = (resume: ResumeData): ScoreResult => {
  let score = 0;
  const tips: string[] = [];

  if (resume.basics.fullName) score += 10;
  else tips.push('Ajoutez votre nom complet.');

  if (resume.basics.title) score += 8;
  else tips.push('Ajoutez un titre professionnel.');

  if (resume.basics.email) score += 8;
  else tips.push('Ajoutez une adresse email.');

  if (resume.basics.summary) score += 12;
  else tips.push('Rédigez un résumé percutant.');

  if (resume.experiences.length >= 2) score += 20;
  else if (resume.experiences.length === 1) {
    score += 12;
    tips.push('Ajoutez une autre expérience pour enrichir votre CV.');
  } else {
    tips.push('Ajoutez au moins une expérience.');
  }

  if (resume.education.length > 0) score += 10;
  else tips.push('Ajoutez votre formation.');

  if (resume.skills.length >= 3) score += 12;
  else tips.push('Ajoutez plus de compétences clés.');

  if (resume.languages.length > 0) score += 8;
  else tips.push('Ajoutez vos langues parlées.');

  if (resume.projects.length > 0 || resume.certifications.length > 0) score += 12;
  else tips.push('Ajoutez un projet ou une certification pour vous démarquer.');

  return { score: clamp(score), tips };
};

import type { ResumeData } from '../types/resume';

export const validateResume = (resume: ResumeData) => {
  const errors: string[] = [];

  if (!resume.basics.fullName) errors.push('Nom complet requis.');
  if (!resume.basics.email) errors.push('Email requis.');
  if (resume.experiences.some(exp => !exp.role || !exp.company)) {
    errors.push('Les expériences doivent avoir un poste et une entreprise.');
  }
  if (resume.education.some(edu => !edu.degree || !edu.school)) {
    errors.push('Les formations doivent avoir un diplôme et une école.');
  }
  if (resume.skills.some(skill => !skill.name)) {
    errors.push('Les compétences doivent avoir un nom.');
  }
  return {
    valid: errors.length === 0,
    errors
  };
};

import { create } from 'zustand';
import { sampleResume, type ResumeData, type Experience, type Education, type Skill, type Language } from '../types/resume';
import { sanitizeText } from '../utils/sanitize';

declare global {
  interface Window {
    api: {
      loadResume: () => Promise<ResumeData | null>;
      saveResume: (resume: ResumeData) => Promise<boolean>;
      exportJson: (resume: ResumeData) => Promise<string | null>;
      importJson: () => Promise<ResumeData | null>;
      exportPdf: (payload: { resume: ResumeData; templateId: string; theme: ResumeData['theme'] }) => Promise<string | null>;
    };
  }
}

type ResumeState = {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
  updateBasics: (field: keyof ResumeData['basics'], value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: keyof Experience, value: string) => void;
  reorderExperience: (from: number, to: number) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, field: keyof Skill, value: string) => void;
  removeSkill: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, field: keyof Language, value: string) => void;
  removeLanguage: (id: string) => void;
  setTemplate: (templateId: string) => void;
  setTheme: (field: keyof ResumeData['theme'], value: string) => void;
  loadFromDisk: () => Promise<void>;
  saveToDisk: () => Promise<void>;
};

const createId = () => crypto.randomUUID();

export const useResumeStore = create<ResumeState>((set, get) => ({
  resume: sampleResume,
  setResume: (resume) => set({ resume }),
  updateBasics: (field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        basics: { ...state.resume.basics, [field]: sanitizeText(value) }
      }
    })),
  addExperience: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        experiences: [
          ...state.resume.experiences,
          {
            id: createId(),
            role: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            summary: ''
          }
        ]
      }
    })),
  updateExperience: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experiences: state.resume.experiences.map((exp) =>
          exp.id === id ? { ...exp, [field]: sanitizeText(value) } : exp
        )
      }
    })),
  reorderExperience: (from, to) =>
    set((state) => {
      const experiences = [...state.resume.experiences];
      const [moved] = experiences.splice(from, 1);
      experiences.splice(to, 0, moved);
      return { resume: { ...state.resume, experiences } };
    }),
  removeExperience: (id) =>
    set((state) => ({
      resume: { ...state.resume, experiences: state.resume.experiences.filter((exp) => exp.id !== id) }
    })),
  addEducation: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [
          ...state.resume.education,
          {
            id: createId(),
            degree: '',
            school: '',
            location: '',
            startDate: '',
            endDate: '',
            details: ''
          }
        ]
      }
    })),
  updateEducation: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((edu) =>
          edu.id === id ? { ...edu, [field]: sanitizeText(value) } : edu
        )
      }
    })),
  removeEducation: (id) =>
    set((state) => ({
      resume: { ...state.resume, education: state.resume.education.filter((edu) => edu.id !== id) }
    })),
  addSkill: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: [...state.resume.skills, { id: createId(), name: '', level: '' }]
      }
    })),
  updateSkill: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.map((skill) =>
          skill.id === id ? { ...skill, [field]: sanitizeText(value) } : skill
        )
      }
    })),
  removeSkill: (id) =>
    set((state) => ({
      resume: { ...state.resume, skills: state.resume.skills.filter((skill) => skill.id !== id) }
    })),
  addLanguage: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: [...state.resume.languages, { id: createId(), name: '', level: '' }]
      }
    })),
  updateLanguage: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: state.resume.languages.map((lang) =>
          lang.id === id ? { ...lang, [field]: sanitizeText(value) } : lang
        )
      }
    })),
  removeLanguage: (id) =>
    set((state) => ({
      resume: { ...state.resume, languages: state.resume.languages.filter((lang) => lang.id !== id) }
    })),
  setTemplate: (templateId) =>
    set((state) => ({ resume: { ...state.resume, templateId } })),
  setTheme: (field, value) =>
    set((state) => ({ resume: { ...state.resume, theme: { ...state.resume.theme, [field]: value } } })),
  loadFromDisk: async () => {
    const data = await window.api.loadResume();
    if (data) set({ resume: data });
  },
  saveToDisk: async () => {
    await window.api.saveResume(get().resume);
  }
}));

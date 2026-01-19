export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type Skill = {
  id: string;
  name: string;
  level: string;
};

export type Language = {
  id: string;
  name: string;
  level: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  link: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

export type ThemeSettings = {
  accentColor: string;
  fontFamily: string;
};

export type Basics = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  website: string;
  linkedin: string;
};

export type ResumeData = {
  basics: Basics;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
  templateId: string;
  theme: ThemeSettings;
};

export const sampleResume: ResumeData = {
  basics: {
    fullName: 'Camille Durand',
    title: 'Chef de projet digital',
    email: 'camille.durand@mail.fr',
    phone: '+33 6 12 34 56 78',
    location: 'Lyon, France',
    summary:
      'Chef de projet avec 8 ans d’expérience en transformation digitale, pilotage de roadmaps produit et coordination d’équipes pluridisciplinaires.',
    website: 'www.camilledurand.fr',
    linkedin: 'linkedin.com/in/camilledurand'
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Chef de projet digital',
      company: 'NovaTech',
      location: 'Lyon',
      startDate: '2021',
      endDate: 'Présent',
      summary:
        'Pilotage de la refonte e-commerce, gestion d’un budget de 450k€, amélioration du taux de conversion de 22%. Encadrement d’une équipe de 6 personnes.'
    },
    {
      id: 'exp-2',
      role: 'Product Owner',
      company: 'Innova Solutions',
      location: 'Paris',
      startDate: '2018',
      endDate: '2021',
      summary:
        'Définition de la roadmap produit, animation des rituels agiles, livraison de 12 releases majeures en 3 ans.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master Management des Systèmes d’Information',
      school: 'IAE Lyon',
      location: 'Lyon',
      startDate: '2014',
      endDate: '2016',
      details: 'Spécialisation stratégie digitale et pilotage de projets.'
    }
  ],
  skills: [
    { id: 'skill-1', name: 'Gestion de projet', level: 'Expert' },
    { id: 'skill-2', name: 'Agile / Scrum', level: 'Avancé' },
    { id: 'skill-3', name: 'Analytics & KPI', level: 'Avancé' }
  ],
  languages: [
    { id: 'lang-1', name: 'Français', level: 'Natif' },
    { id: 'lang-2', name: 'Anglais', level: 'Professionnel' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Plateforme B2B',
      description: 'Lancement d’un portail client B2B avec onboarding digital complet.',
      link: 'https://example.com'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'PSM I',
      issuer: 'Scrum.org',
      year: '2020'
    }
  ],
  templateId: 'modern',
  theme: {
    accentColor: '#2563eb',
    fontFamily: 'Inter'
  }
};

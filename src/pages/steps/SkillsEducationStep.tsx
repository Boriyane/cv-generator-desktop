import { useTranslation } from 'react-i18next';
import { useResumeStore } from '../../store/useResumeStore';

const SkillsEducationStep = () => {
  const { t } = useTranslation();
  const resume = useResumeStore((state) => state.resume);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const addLanguage = useResumeStore((state) => state.addLanguage);
  const updateLanguage = useResumeStore((state) => state.updateLanguage);
  const removeLanguage = useResumeStore((state) => state.removeLanguage);

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('education.degree')}</h2>
          <button
            type="button"
            className="px-3 py-2 rounded bg-slate-900 text-white"
            onClick={addEducation}
          >
            {t('actions.add')}
          </button>
        </div>
        {resume.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 bg-slate-50 space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">Formation</p>
              <button type="button" className="text-sm text-rose-600" onClick={() => removeEducation(edu.id)}>
                {t('actions.remove')}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ['degree', t('education.degree')],
                  ['school', t('education.school')],
                  ['location', t('education.location')],
                  ['startDate', t('education.startDate')],
                  ['endDate', t('education.endDate')]
                ] as const
              ).map(([field, label]) => (
                <label key={field} className="text-sm font-medium text-slate-600">
                  {label}
                  <input
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={edu[field]}
                    onChange={(event) => updateEducation(edu.id, field, event.target.value)}
                  />
                </label>
              ))}
            </div>
            <label className="text-sm font-medium text-slate-600">
              {t('education.details')}
              <textarea
                className="mt-1 w-full rounded border px-3 py-2 min-h-[80px]"
                value={edu.details}
                onChange={(event) => updateEducation(edu.id, 'details', event.target.value)}
              />
            </label>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('steps.skills')}</h2>
          <button
            type="button"
            className="px-3 py-2 rounded bg-slate-900 text-white"
            onClick={addSkill}
          >
            {t('actions.add')}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {resume.skills.map((skill) => (
            <div key={skill.id} className="border rounded-lg p-3 bg-slate-50 space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-slate-500">Compétence</p>
                <button type="button" className="text-xs text-rose-600" onClick={() => removeSkill(skill.id)}>
                  {t('actions.remove')}
                </button>
              </div>
              <label className="text-sm font-medium text-slate-600">
                {t('skills.name')}
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  value={skill.name}
                  onChange={(event) => updateSkill(skill.id, 'name', event.target.value)}
                />
              </label>
              <label className="text-sm font-medium text-slate-600">
                {t('skills.level')}
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  value={skill.level}
                  onChange={(event) => updateSkill(skill.id, 'level', event.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('languages.name')}</h2>
          <button
            type="button"
            className="px-3 py-2 rounded bg-slate-900 text-white"
            onClick={addLanguage}
          >
            {t('actions.add')}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {resume.languages.map((lang) => (
            <div key={lang.id} className="border rounded-lg p-3 bg-slate-50 space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-slate-500">Langue</p>
                <button type="button" className="text-xs text-rose-600" onClick={() => removeLanguage(lang.id)}>
                  {t('actions.remove')}
                </button>
              </div>
              <label className="text-sm font-medium text-slate-600">
                {t('languages.name')}
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  value={lang.name}
                  onChange={(event) => updateLanguage(lang.id, 'name', event.target.value)}
                />
              </label>
              <label className="text-sm font-medium text-slate-600">
                {t('languages.level')}
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  value={lang.level}
                  onChange={(event) => updateLanguage(lang.id, 'level', event.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SkillsEducationStep;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '../../store/useResumeStore';

const ExperienceStep = () => {
  const { t } = useTranslation();
  const experiences = useResumeStore((state) => state.resume.experiences);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const reorderExperience = useResumeStore((state) => state.reorderExperience);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('steps.experience')}</h2>
        <button
          type="button"
          className="px-3 py-2 rounded bg-slate-900 text-white"
          onClick={addExperience}
        >
          {t('actions.add')}
        </button>
      </div>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="border rounded-lg p-4 bg-slate-50"
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (dragIndex === null || dragIndex === index) return;
              reorderExperience(dragIndex, index);
              setDragIndex(null);
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-500">Drag & drop pour trier</p>
              <button
                type="button"
                className="text-sm text-rose-600"
                onClick={() => removeExperience(exp.id)}
              >
                {t('actions.remove')}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ['role', t('experience.role')],
                  ['company', t('experience.company')],
                  ['location', t('experience.location')],
                  ['startDate', t('experience.startDate')],
                  ['endDate', t('experience.endDate')]
                ] as const
              ).map(([field, label]) => (
                <label key={field} className="text-sm font-medium text-slate-600">
                  {label}
                  <input
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={exp[field]}
                    onChange={(event) => updateExperience(exp.id, field, event.target.value)}
                  />
                </label>
              ))}
            </div>
            <label className="text-sm font-medium text-slate-600">
              {t('experience.summary')}
              <textarea
                className="mt-1 w-full rounded border px-3 py-2 min-h-[100px]"
                value={exp.summary}
                onChange={(event) => updateExperience(exp.id, 'summary', event.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceStep;

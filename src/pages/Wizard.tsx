import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileStep from './steps/ProfileStep';
import ExperienceStep from './steps/ExperienceStep';
import SkillsEducationStep from './steps/SkillsEducationStep';
import DesignExportStep from './steps/DesignExportStep';
import PreviewPane from '../components/PreviewPane';
import { useResumeStore } from '../store/useResumeStore';
import { calculateScore } from '../utils/score';

const Wizard = () => {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  const resume = useResumeStore((state) => state.resume);
  const saveToDisk = useResumeStore((state) => state.saveToDisk);

  const steps = useMemo(
    () => [
      { id: 'profile', label: t('steps.profile'), component: <ProfileStep /> },
      { id: 'experience', label: t('steps.experience'), component: <ExperienceStep /> },
      { id: 'skills', label: t('steps.skills'), component: <SkillsEducationStep /> },
      { id: 'design', label: t('steps.design'), component: <DesignExportStep /> }
    ],
    [t]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      void saveToDisk();
    }, 400);
    return () => clearTimeout(timeout);
  }, [resume, saveToDisk]);

  const { score, tips } = calculateScore(resume);

  return (
    <main className="grid grid-cols-[260px_minmax(0,1fr)_380px] gap-6 px-6 py-6">
      <aside className="bg-white border rounded-lg p-4 h-fit">
        <h2 className="font-semibold mb-4">{t('steps.profile')}</h2>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step.id}>
              <button
                type="button"
                className={`w-full text-left px-3 py-2 rounded-md border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  index === stepIndex
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
                onClick={() => setStepIndex(index)}
              >
                {step.label}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">{t('score.title')}</h3>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-accent" style={{ width: `${score}%` }} />
          </div>
          <p className="text-sm mt-2">{score}%</p>
          <h4 className="text-xs uppercase tracking-wide text-slate-400 mt-4">{t('score.tipsTitle')}</h4>
          <ul className="text-sm text-slate-600 mt-2 space-y-1">
            {tips.slice(0, 4).map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="bg-white border rounded-lg p-6 space-y-6">
        {steps[stepIndex].component}
        <div className="flex justify-between pt-4 border-t">
          <button
            type="button"
            className="px-4 py-2 rounded border bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={stepIndex === 0}
          >
            {t('actions.back')}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-slate-900 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={stepIndex === steps.length - 1}
          >
            {t('actions.next')}
          </button>
        </div>
      </section>

      <PreviewPane />
    </main>
  );
};

export default Wizard;

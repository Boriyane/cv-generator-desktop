import { useTranslation } from 'react-i18next';
import { useResumeStore } from '../../store/useResumeStore';

const ProfileStep = () => {
  const { t } = useTranslation();
  const basics = useResumeStore((state) => state.resume.basics);
  const updateBasics = useResumeStore((state) => state.updateBasics);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('steps.profile')}</h2>
      <div className="grid grid-cols-2 gap-4">
        {(
          [
            ['fullName', t('profile.fullName')],
            ['title', t('profile.title')],
            ['email', t('profile.email')],
            ['phone', t('profile.phone')],
            ['location', t('profile.location')],
            ['website', t('profile.website')],
            ['linkedin', t('profile.linkedin')]
          ] as const
        ).map(([field, label]) => (
          <label key={field} className="text-sm font-medium text-slate-600">
            {label}
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={basics[field]}
              onChange={(event) => updateBasics(field, event.target.value)}
            />
          </label>
        ))}
      </div>
      <label className="text-sm font-medium text-slate-600">
        {t('profile.summary')}
        <textarea
          className="mt-1 w-full rounded border px-3 py-2 min-h-[120px]"
          value={basics.summary}
          onChange={(event) => updateBasics('summary', event.target.value)}
        />
      </label>
    </div>
  );
};

export default ProfileStep;

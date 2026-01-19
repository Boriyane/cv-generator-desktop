import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '../../store/useResumeStore';
import { validateResume } from '../../utils/validate';

const templates = [
  { id: 'modern', name: 'Modern Minimal' },
  { id: 'executive', name: 'Executive' },
  { id: 'twoColumn', name: 'Two-column' }
];

const fonts = ['Inter', 'Merriweather'];

const DesignExportStep = () => {
  const { t } = useTranslation();
  const resume = useResumeStore((state) => state.resume);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const setTheme = useResumeStore((state) => state.setTheme);
  const setResume = useResumeStore((state) => state.setResume);
  const [status, setStatus] = useState('');

  const onExportPdf = async () => {
    setStatus('');
    const validation = validateResume(resume);
    if (!validation.valid) {
      setStatus(validation.errors.join(' '));
      return;
    }
    await window.api.exportPdf({ resume, templateId: resume.templateId, theme: resume.theme });
  };

  const onExportJson = async () => {
    await window.api.exportJson(resume);
  };

  const onImportJson = async () => {
    const data = await window.api.importJson();
    if (data) setResume(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('steps.design')}</h2>
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500">{t('design.template')}</h3>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              className={`border rounded-lg p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                resume.templateId === template.id ? 'border-slate-900' : 'border-slate-200'
              }`}
              onClick={() => setTemplate(template.id)}
            >
              <p className="font-medium">{template.name}</p>
              <p className="text-xs text-slate-500">Aperçu fidèle du template.</p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500">{t('design.theme')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-600">
            {t('design.accent')}
            <input
              type="color"
              className="mt-1 w-full h-10 rounded border"
              value={resume.theme.accentColor}
              onChange={(event) => setTheme('accentColor', event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-600">
            {t('design.font')}
            <select
              className="mt-1 w-full rounded border px-3 py-2"
              value={resume.theme.fontFamily}
              onChange={(event) => setTheme('fontFamily', event.target.value)}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="space-y-3">
        {status && <p className="text-sm text-rose-600">{status}</p>}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded bg-slate-900 text-white"
            onClick={onExportPdf}
          >
            {t('actions.exportPdf')}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded border"
            onClick={onExportJson}
          >
            {t('actions.exportJson')}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded border"
            onClick={onImportJson}
          >
            {t('actions.importJson')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DesignExportStep;

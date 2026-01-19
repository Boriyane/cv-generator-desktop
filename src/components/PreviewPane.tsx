import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { ModernMinimal } from '../templates/ModernMinimal';
import { Executive } from '../templates/Executive';
import { TwoColumn } from '../templates/TwoColumn';

const PreviewPane = () => {
  const resume = useResumeStore((state) => state.resume);

  const Template = useMemo(() => {
    if (resume.templateId === 'executive') return Executive;
    if (resume.templateId === 'twoColumn') return TwoColumn;
    return ModernMinimal;
  }, [resume.templateId]);

  return (
    <aside className="bg-white border rounded-lg p-4 h-fit">
      <h2 className="text-sm font-semibold text-slate-500 mb-3">Preview</h2>
      <div
        className="border rounded-lg shadow-inner p-4 min-h-[700px]"
        style={
          {
            '--accent-color': resume.theme.accentColor,
            '--app-font': resume.theme.fontFamily
          } as CSSProperties
        }
      >
        <Template resume={resume} theme={resume.theme} />
      </div>
    </aside>
  );
};

export default PreviewPane;

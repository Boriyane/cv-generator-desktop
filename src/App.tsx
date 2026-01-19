import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Wizard from './pages/Wizard';
import { useResumeStore } from './store/useResumeStore';

const App = () => {
  const { t, i18n } = useTranslation();
  const loadFromDisk = useResumeStore((state) => state.loadFromDisk);

  useEffect(() => {
    void loadFromDisk();
  }, [loadFromDisk]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div>
          <h1 className="text-xl font-semibold">{t('appTitle')}</h1>
          <p className="text-sm text-slate-500">Offline CV Builder</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={`px-3 py-2 rounded border text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              i18n.language === 'fr' ? 'bg-slate-900 text-white' : 'bg-white'
            }`}
            onClick={() => void i18n.changeLanguage('fr')}
          >
            FR
          </button>
          <button
            type="button"
            className={`px-3 py-2 rounded border text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              i18n.language === 'en' ? 'bg-slate-900 text-white' : 'bg-white'
            }`}
            onClick={() => void i18n.changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </header>
      <Wizard />
    </div>
  );
};

export default App;

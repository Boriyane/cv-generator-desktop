import type { ResumeData, ThemeSettings } from '../src/types/resume';

export const IPC_CHANNELS = {
  LOAD_RESUME: 'resume:load',
  SAVE_RESUME: 'resume:save',
  EXPORT_PDF: 'resume:export-pdf',
  EXPORT_JSON: 'resume:export-json',
  IMPORT_JSON: 'resume:import-json'
} as const;

export type ExportPdfPayload = {
  resume: ResumeData;
  templateId: string;
  theme: ThemeSettings;
};

const isString = (value: unknown): value is string => typeof value === 'string';
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const validateExportPdfPayload = (payload: unknown): payload is ExportPdfPayload => {
  if (!isObject(payload)) return false;
  return (
    isObject(payload.resume) &&
    isString(payload.templateId) &&
    isObject(payload.theme) &&
    isString(payload.theme.accentColor) &&
    isString(payload.theme.fontFamily)
  );
};

export const validateResumePayload = (payload: unknown): payload is ResumeData =>
  isObject(payload) && isString(payload.basics?.fullName) && isString(payload.basics?.email);

export const validateJsonString = (payload: unknown): payload is string => isString(payload);

import { contextBridge, ipcRenderer } from 'electron';
import {
  IPC_CHANNELS,
  validateExportPdfPayload,
  validateResumePayload
} from './ipcChannels';
import type { ExportPdfPayload } from './ipcChannels';
import type { ResumeData } from '../src/types/resume';

const api = {
  loadResume: () => ipcRenderer.invoke(IPC_CHANNELS.LOAD_RESUME) as Promise<ResumeData | null>,
  saveResume: (resume: ResumeData) => {
    if (!validateResumePayload(resume)) {
      return Promise.reject(new Error('Invalid resume data'));
    }
    return ipcRenderer.invoke(IPC_CHANNELS.SAVE_RESUME, resume) as Promise<boolean>;
  },
  exportJson: (resume: ResumeData) => {
    if (!validateResumePayload(resume)) {
      return Promise.reject(new Error('Invalid resume data'));
    }
    return ipcRenderer.invoke(IPC_CHANNELS.EXPORT_JSON, resume) as Promise<string | null>;
  },
  importJson: () => ipcRenderer.invoke(IPC_CHANNELS.IMPORT_JSON) as Promise<ResumeData | null>,
  exportPdf: (payload: ExportPdfPayload) => {
    if (!validateExportPdfPayload(payload)) {
      return Promise.reject(new Error('Invalid export payload'));
    }
    return ipcRenderer.invoke(IPC_CHANNELS.EXPORT_PDF, payload) as Promise<string | null>;
  }
};

contextBridge.exposeInMainWorld('api', api);

export type ApiBridge = typeof api;

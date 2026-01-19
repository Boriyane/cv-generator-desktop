import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  IPC_CHANNELS,
  validateExportPdfPayload,
  validateJsonString,
  validateResumePayload,
  type ExportPdfPayload
} from './ipcChannels';
import type { ResumeData } from '../src/types/resume';
import { ModernMinimal } from '../src/templates/ModernMinimal';
import { Executive } from '../src/templates/Executive';
import { TwoColumn } from '../src/templates/TwoColumn';

const resumeFilePath = () => path.join(app.getPath('userData'), 'resume.json');

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), 'dist/electron/preload.js')
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile(path.join(app.getAppPath(), 'dist/renderer/index.html'));
  }
};

const templateMap = {
  modern: ModernMinimal,
  executive: Executive,
  twoColumn: TwoColumn
} as const;

const renderTemplateHtml = ({ resume, templateId, theme }: ExportPdfPayload) => {
  const Template = templateMap[templateId as keyof typeof templateMap] ?? ModernMinimal;
  const markup = renderToStaticMarkup(
    React.createElement(Template, { resume, theme })
  );

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; font-family: ${theme.fontFamily}, Arial, sans-serif; color: #0f172a; }
      .page { page-break-after: always; }
      .section { margin-bottom: 16px; }
      h1, h2, h3 { margin: 0; }
      ul { padding-left: 18px; margin: 8px 0; }
      .accent { color: ${theme.accentColor}; }
    </style>
  </head>
  <body>
    ${markup}
  </body>
</html>`;
};

const registerIpcHandlers = () => {
  ipcMain.handle(IPC_CHANNELS.LOAD_RESUME, async () => {
    try {
      const data = await fs.readFile(resumeFilePath(), 'utf-8');
      return JSON.parse(data) as ResumeData;
    } catch {
      return null;
    }
  });

  ipcMain.handle(IPC_CHANNELS.SAVE_RESUME, async (_event, payload: unknown) => {
    if (!validateResumePayload(payload)) {
      throw new Error('Invalid resume payload');
    }
    await fs.writeFile(resumeFilePath(), JSON.stringify(payload, null, 2), 'utf-8');
    return true;
  });

  ipcMain.handle(IPC_CHANNELS.EXPORT_JSON, async (_event, payload: unknown) => {
    if (!validateResumePayload(payload)) {
      throw new Error('Invalid resume payload');
    }
    const { canceled, filePath } = await dialog.showSaveDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      defaultPath: 'resume.json'
    });
    if (canceled || !filePath) return null;
    await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
    return filePath;
  });

  ipcMain.handle(IPC_CHANNELS.IMPORT_JSON, async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile']
    });
    if (canceled || filePaths.length === 0) return null;
    const data = await fs.readFile(filePaths[0], 'utf-8');
    if (!validateJsonString(data)) return null;
    return JSON.parse(data) as ResumeData;
  });

  ipcMain.handle(IPC_CHANNELS.EXPORT_PDF, async (_event, payload: unknown) => {
    if (!validateExportPdfPayload(payload)) {
      throw new Error('Invalid export payload');
    }
    const { canceled, filePath } = await dialog.showSaveDialog({
      filters: [{ name: 'PDF', extensions: ['pdf'] }],
      defaultPath: 'resume.pdf'
    });
    if (canceled || !filePath) return null;
    const html = renderTemplateHtml(payload);
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.pdf({
      path: filePath,
      format: 'A4',
      margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' },
      printBackground: true
    });
    await browser.close();
    return filePath;
  });
};

app.whenReady().then(() => {
  registerIpcHandlers();
  void createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

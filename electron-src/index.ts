// Native
import path, { join } from 'path';
import { format } from 'url';

// Packages
import { BrowserWindow, app, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

import {
  addTodoProcess,
  deleteTodoProcess,
  updateTodoProcess,
  loadFile,
} from './Controller';
import { Todo } from '../renderer/interfaces/Todo';

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

ipcMain.handle('formCreate', async (event, formdata: Todo) => {
  await addTodoProcess(formdata);
  event.sender.send('createComplete');
});

ipcMain.handle('formUpdate', async (event, formdata: Todo) => {
  await updateTodoProcess(formdata.id, formdata);
  event.sender.send('updateComplete');
});

ipcMain.handle('formDelete', async (event, id: string) => {
  await deleteTodoProcess(id);
  event.sender.send('deleteComplete');
});

ipcMain.handle('fetch', async (_event) => {
  const data = await loadFile();
  return data;
});

ipcMain.handle('getPath', async (_event) => {
  const dataFilePath = path.join(__dirname, 'public', 'FormData.json');
  return dataFilePath;
});

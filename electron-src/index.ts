// Native
import { join } from 'path'
import { format } from 'url'
import fs from 'fs'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, remote } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

import {creatingTodoProcess, deleteTodoProcess, getConfig} from './Controller'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})

ipcMain.on('formUp', (_event: IpcMainEvent, formdata: any) => {
  creatingTodoProcess(formdata);
})

ipcMain.on('formDelete', (_event: IpcMainEvent, id: string) => {
  deleteTodoProcess(id);
})

ipcMain.on('makeWatch', (event: IpcMainEvent) => {
  const appDataPath = remote.app.getPath('appData');
    const filePath = `${appDataPath}/myAppFormData.json`;

    const watcher = fs.watch(filePath, (eventType) => {
      if (eventType === 'change') {
        event.reply('changedText', getConfig())
      }
    });

    return () => {
      watcher.close();
    };
})

ipcMain.handle('getMyData',() => {
  const data = getConfig()
  return data
})
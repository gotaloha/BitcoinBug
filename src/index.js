const { app, BrowserWindow } = require('electron');
const fetch = require('electron-main-fetch');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    center: true,
    frame: true,
    height: 100,
    minHeight: 100,
    minWidth: 200,
    resizable: true,
    titleBarStyle: 'hidden',
    transparent: true,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
    },
    width: 200,
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


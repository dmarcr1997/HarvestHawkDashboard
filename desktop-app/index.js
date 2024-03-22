const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, './icon.png')
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

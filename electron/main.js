const { app, BrowserWindow, screen: electronScreen, shell } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const startIpfs = require('./startIpfs')
const {URL} = require('node:url')

startIpfs();

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true, // TODO: change to isDev when no bugs left
      preload: path.join(__dirname, 'preload.js')
    },
  });
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);

    if (isDev) {
      mainWindow.openDevTools()
    }
  });

  // open links in external browser
  // do not open links in plebbit-react or will lead to remote execution
  mainWindow.webContents.on('will-navigate', (e, originalUrl) => {
    if (originalUrl != mainWindow.webContents.getURL()) {
      e.preventDefault()
      try {
        // do not let the user open any url with shell.openExternal
        // or it will lead to remote execution https://benjamin-altpeter.de/shell-openexternal-dangers/

        // only open valid https urls to prevent remote execution
        // will throw if url isn't valid
        const validatedUrl = new URL(originalUrl)
        if (validatedUrl.protocol !== 'https:') {
          throw Error(`can't open url '${originalUrl}' not https`)
        }

        // do not open http protocol, not private
        // do not open any other protocol, will lead to remote execution

        // open serialized url to prevent remote execution
        const serializedUrl = validatedUrl.toString()
        shell.openExternal(serializedUrl);
      }
      catch (e) {
        console.warn(e)
      }
    }
  })
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

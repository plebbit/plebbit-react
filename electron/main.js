require('./log');
const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  Tray,
  screen: electronScreen,
  shell,
  dialog,
} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const startIpfs = require('./startIpfs');
const { URL } = require('node:url');

let startIpfsError;
startIpfs().catch((e) => {
  startIpfsError = e;
  console.error(e);
});

// add right click menu
const contextMenu = require('electron-context-menu');
contextMenu({
  // prepend custom buttons to top
  prepend: (defaultActions, parameters, browserWindow) => [
    {
      label: 'Back',
      visible: parameters.mediaType === 'none',
      enabled: browserWindow?.webContents?.canGoBack(),
      click: () => browserWindow?.webContents?.goBack(),
    },
    {
      label: 'Forward',
      visible: parameters.mediaType === 'none',
      enabled: browserWindow?.webContents?.canGoForward(),
      click: () => browserWindow?.webContents?.goForward(),
    },
    {
      label: 'Reload',
      visible: parameters.mediaType === 'none',
      click: () => browserWindow?.webContents?.reload(),
    },
  ],
  showLookUpSelection: false,
  showCopyImage: true,
  showCopyImageAddress: true,
  showSaveImageAs: true,
  showSaveLinkAs: true,
  showInspectElement: true,
  showServices: false,
  showSearchWithGoogle: false,
});

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      // fix cors error for Chain providers
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true, // TODO: change to isDev when no bugs left
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', async () => {
    // make sure back button is disabled on launch
    mainWindow.webContents.clearHistory();

    mainWindow.show();

    if (isDev) {
      mainWindow.openDevTools();
    }

    if (startIpfsError) {
      dialog.showErrorBox('IPFS error', startIpfsError.message);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // use common user agent instead of electron
  // https://www.whatismybrowser.com/guides/the-latest-version/chrome
  // https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome
  mainWindow.webContents.userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36';

  // don't open new windows
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });

  // open links in external browser
  // do not open links in plebbit or will lead to remote execution
  mainWindow.webContents.on('will-navigate', (e, originalUrl) => {
    if (originalUrl != mainWindow.webContents.getURL()) {
      e.preventDefault();
      try {
        // do not let the user open any url with shell.openExternal
        // or it will lead to remote execution https://benjamin-altpeter.de/shell-openexternal-dangers/

        // only open valid https urls to prevent remote execution
        // will throw if url isn't valid
        const validatedUrl = new URL(originalUrl);
        if (validatedUrl.protocol !== 'https:') {
          throw Error(`can't open url '${originalUrl}' not https`);
        }

        // do not open http protocol, not private
        // do not open any other protocol, will lead to remote execution

        // open serialized url to prevent remote execution
        const serializedUrl = validatedUrl.toString();
        shell.openExternal(serializedUrl);
      } catch (e) {
        console.warn(e);
      }
    }
  });

  // open links (with target="_blank") in external browser
  // do not open links in plebbit-react or will lead to remote execution
  mainWindow.webContents.setWindowOpenHandler(({url}) => {
    const originalUrl = url
    try {
      // do not let the user open any url with shell.openExternal
      // or it will lead to remote execution https://benjamin-altpeter.de/shell-openexternal-dangers/

      // only open valid https urls to prevent remote execution
      // will throw if url isn't valid
      const validatedUrl = new URL(originalUrl);
      if (validatedUrl.protocol !== 'https:') {
        throw Error(`can't open url '${originalUrl}' not https`);
      }

      // do not open http protocol, not private
      // do not open any other protocol, will lead to remote execution

      // open serialized url to prevent remote execution
      const serializedUrl = validatedUrl.toString();
      shell.openExternal(serializedUrl);
      setImmediate(() => {
        shell.openExternal(serializedUrl)
      })
    } catch (e) {
      console.warn(e);
    }
    return {action: 'deny'}
  })

  // deny permissions like location, notifications, etc https://www.electronjs.org/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content
  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    // deny all permissions
    return callback(false)
  })

  // deny attaching webview https://www.electronjs.org/docs/latest/tutorial/security#12-verify-webview-options-before-creation
  mainWindow.webContents.on('will-attach-webview', (e, webPreferences, params) => {
    // deny all
    e.preventDefault()
  })

  if (process.platform !== 'darwin') {
    // tray
    const trayIconPath = path.join(
      __dirname,
      '..',
      isDev ? 'public' : 'build',
      'electron-tray-icon.png'
    );
    const tray = new Tray(trayIconPath);
    tray.setToolTip('plebbit');
    const trayMenu = Menu.buildFromTemplate([
      {
        label: 'Open plebbit',
        click: () => {
          mainWindow.show();
        },
      },
      {
        label: 'Quit plebbit',
        click: () => {
          mainWindow.destroy();
          app.quit();
        },
      },
    ]);
    tray.setContextMenu(trayMenu);

    // show/hide on tray right click
    tray.on('right-click', () => {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });

    // close to tray
    if (!isDev) {
      let isQuiting = false;
      app.on('before-quit', () => {
        isQuiting = true;
      });
      mainWindow.on('close', (event) => {
        if (!isQuiting) {
          event.preventDefault();
          mainWindow.hide();
          event.returnValue = false;
        }
      });
    }
  }

  // application menu
  // hide useless electron help menu
  if (process.platform === 'darwin') {
    const appMenu = Menu.getApplicationMenu();
    appMenu.insert(1, appMenuBack);
    appMenu.insert(2, appMenuForward);
    appMenu.insert(3, appMenuReload);
    Menu.setApplicationMenu(appMenu);
  } else {
    // Other platforms
    const originalAppMenuWithoutHelp = Menu.getApplicationMenu()?.items.filter(
      (item) => item.role !== 'help'
    );
    const appMenu = [appMenuBack, appMenuForward, appMenuReload, ...originalAppMenuWithoutHelp];
    Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu));
  }
  
  const appMenuBack = new MenuItem({
    label: '←',
    enabled: mainWindow?.webContents?.canGoBack(),
    click: () => mainWindow?.webContents?.goBack(),
  });
  const appMenuForward = new MenuItem({
    label: '→',
    enabled: mainWindow?.webContents?.canGoForward(),
    click: () => mainWindow?.webContents?.goForward(),
  });
  const appMenuReload = new MenuItem({
    label: '⟳',
    role: 'reload',
    click: () => mainWindow?.webContents?.reload(),
  });
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

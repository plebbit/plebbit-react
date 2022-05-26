const { app, BrowserWindow, screen: electronScreen } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const {spawn, spawnSync} = require('child_process');
const fs = require('fs-extra')
const envPaths = require('env-paths').default('plebbit', {suffix: false})
const ps = require('node:process')

const startIpfs = () => {
  const ipfsFileName = process.platform == 'win32' ? 'ipfs.exe' : 'ipfs';
  let ipfsPath = path.join(process.resourcesPath, 'bin', ipfsFileName);
  let ipfsDataPath = path.join(envPaths.data, 'ipfs')

  // test launching the ipfs binary in dev mode
  // they must be downloaded first using `yarn electron:build`
  if (isDev) {
    let binFolderName = 'win';
    if (process.platform === 'linux') {
      binFolderName = 'linux';
    }
    if (process.platform === 'darwin') {
      binFolderName = 'mac';
    }
    ipfsPath = path.join(__dirname, '..', 'bin', binFolderName, ipfsFileName);
    ipfsDataPath = path.join(__dirname, '..', '.plebbit', 'ipfs')
  }

  if (!fs.existsSync(ipfsPath)) {
    throw Error(`ipfs binary '${ipfsPath}' doesn't exist`)
  }

  console.log({ipfsPath, ipfsDataPath})

  fs.ensureDirSync(ipfsDataPath)
  const env = {IPFS_PATH: ipfsDataPath}
  // init ipfs client on first launch
  try {
    spawnSync(ipfsPath, ['init'], {stdio: 'inherit', env});
  }
  catch (e) {
    console.error(e);
  }

  // disable gateway because plebbit doesn't use it and it wastes a port
  spawnSync(ipfsPath, ['config', '--json', 'Addresses.Gateway', 'null'], {stdio: 'inherit', env});

  const ipfsProcess = spawn(ipfsPath, ['daemon', '--enable-pubsub-experiment'], {env});
  console.log(`ipfs daemon process started with pid ${ipfsProcess.pid}`)
  ipfsProcess.stderr.on('data', (data) => console.error(data.toString()))
  ipfsProcess.stdin.on('data', (data) => console.log(data.toString()))
  ipfsProcess.stdout.on('data', (data) => console.log(data.toString()))
  ipfsProcess.on('error', (data) => console.error(data.toString()))
  ipfsProcess.on('exit', () => {
    console.error(`ipfs process with pid ${ipfsProcess.pid} exited`)
    process.exit(1)
  })
  process.on('exit', () => {
    ps.kill(ipfsProcess.pid + 1)
  })
}
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
      devTools: isDev,
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

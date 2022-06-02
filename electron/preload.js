const PlebbitJs = require('@plebbit/plebbit-js');
const isDev = require('electron-is-dev');
const envPaths = require('env-paths').default('plebbit', {suffix: false})

// add PlebbitJs to window.PlebbitJs so that the hooks
// can call setPlebbitJs(PlebbitJs) and use Plebbit with
// all node privileges
window.PlebbitJs = PlebbitJs
window.DefaultPlebbitOptions = {
  // find the user's OS data path
  dataPath: !isDev ? envPaths.data : undefined,
  ipfsHttpClientOptions: 'http://localhost:5001/api/v0',
  // TODO: having to define pubsubHttpClientOptions and ipfsHttpClientOptions is a bug with plebbit-js
  pubsubHttpClientOptions: 'http://localhost:5001/api/v0',
  // ipfsGatewayUrl: 'https://cloudflare-ipfs.com',
  // pubsubHttpClientOptions: 'https://pubsubprovider.xyz/api/v0',
}

// TODO: create context isolated plebbit-js functions to use
// without contextIsolation: true for improved security

localStorage.debug = 'plebbit-js:*,plebbit-react-hooks:*'

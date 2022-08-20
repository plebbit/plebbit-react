// force IpfsHttpClient to use node-fetch to fix max 6 connections
// very hacky, might break at some point, wont be needed after
// switch to contextIsolation
const mock = require('mock-require');
const fetch = require('node-fetch');
mock('ipfs-utils/src/env.js', {
  isTest: false,
  isElectron: false,
  isElectronMain: false,
  isElectronRenderer: false,
  isNode: true,
  isBrowser: false,
  isWebWorker: false,
  isEnvWithDom: false,
  isReactNative: false,
});
mock('native-fetch', {
  default: fetch.default,
  Headers: fetch.Headers,
  Request: fetch.Request,
  Response: fetch.Response,
});

// dev uses http://localhost, prod uses file://...index.html
const isDev = window.location.protocol === 'http:';

// add PlebbitJs to window.PlebbitJs so that the hooks
// can call setPlebbitJs(PlebbitJs) and use Plebbit with
// all node privileges
const PlebbitJs = require('@plebbit/plebbit-js');
const envPaths = require('env-paths').default('plebbit', { suffix: false });
window.PlebbitJs = PlebbitJs;
window.DefaultPlebbitOptions = {
  // find the user's OS data path
  dataPath: !isDev ? envPaths.data : undefined,
  ipfsHttpClientOptions: 'http://localhost:5001/api/v0',
  // TODO: having to define pubsubHttpClientOptions and ipfsHttpClientOptions is a bug with plebbit-js
  pubsubHttpClientOptions: 'http://localhost:5001/api/v0',
  // electron starts the local ipfs gateway on port 11028 because 8080 is too common
  ipfsGatewayUrl: 'http://localhost:11028',
  // ipfsGatewayUrl: 'https://cloudflare-ipfs.com',
  // pubsubHttpClientOptions: 'https://pubsubprovider.xyz/api/v0',
};

// TODO: create context isolated plebbit-js functions to use
// without contextIsolation: true for improved security

// try/catch localStorage.debug because was causing unknown error sometimes
try {
  localStorage.debug = 'plebbit-js:*,plebbit-react-hooks:*,plebbit-react:*';
} catch (e) {
  console.log(e);
}

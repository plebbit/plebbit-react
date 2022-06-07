// force IpfsHttpClient to use node-fetch to fix max 6 connections
// very hacky, might break at some point, wont be needed after
// switch to contextIsolation
const mock = require('mock-require')
const fetch = require('node-fetch')
mock('ipfs-utils/src/env.js', {
  isTest: false, isElectron: false, isElectronMain: false, 
  isElectronRenderer: false, isNode: true, isBrowser: false, 
  isWebWorker: false, isEnvWithDom: false, isReactNative: false
})
mock('native-fetch', {default: fetch.default, Headers: fetch.Headers, Request: fetch.Request, Response: fetch.Response})

// add PlebbitJs to window.PlebbitJs so that the hooks
// can call setPlebbitJs(PlebbitJs) and use Plebbit with
// all node privileges
const PlebbitJs = require('@plebbit/plebbit-js');
const isDev = require('electron-is-dev');
const envPaths = require('env-paths').default('plebbit', {suffix: false})
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

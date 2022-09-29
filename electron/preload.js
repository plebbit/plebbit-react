const envPaths = require('env-paths').default('plebbit', { suffix: false });
const {contextBridge} = require('electron')
const path = require('path')

// dev uses http://localhost, prod uses file://...index.html
const isDev = window.location.protocol === 'http:';

const defaultPlebbitOptions = {
  // find the user's OS data path
  dataPath: !isDev ? envPaths.data : path.join(__dirname, '..', '.plebbit'),
  ipfsHttpClientOptions: 'http://localhost:5001/api/v0',
  // TODO: having to define pubsubHttpClientOptions and ipfsHttpClientOptions is a bug with plebbit-js
  pubsubHttpClientOptions: 'http://localhost:5001/api/v0',
  // electron starts the local ipfs gateway on port 11028 because 8080 is too common
  ipfsGatewayUrl: 'http://localhost:11028',
  // ipfsGatewayUrl: 'https://cloudflare-ipfs.com',
  // pubsubHttpClientOptions: 'https://pubsubprovider.xyz/api/v0',
};

// expose plebbit-js native functions into electron's renderer
contextBridge.exposeInMainWorld('plebbitJsNativeFunctions', require('@plebbit/plebbit-js').nativeFunctions.node)
contextBridge.exposeInMainWorld('defaultPlebbitOptions', defaultPlebbitOptions)

// try/catch localStorage.debug because causes unknown error sometimes
try {
  localStorage.debug = 'plebbit-js:*,plebbit-react-hooks:*,plebbit-react:*';
} catch (e) {
  console.log(e);
}

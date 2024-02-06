// use this proxy server to debug ipfs api requests made by electron

const http = require('http');
const httpProxy = require('http-proxy');

// start proxy
const proxy = httpProxy.createProxyServer({});

// rewrite the request
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  // remove headers that could potentially cause an ipfs 403 error
  proxyReq.removeHeader('X-Forwarded-For');
  proxyReq.removeHeader('X-Forwarded-Proto');
  proxyReq.removeHeader('sec-ch-ua');
  proxyReq.removeHeader('sec-ch-ua-mobile');
  proxyReq.removeHeader('user-agent');
  proxyReq.removeHeader('origin');
  proxyReq.removeHeader('sec-fetch-site');
  proxyReq.removeHeader('sec-fetch-mode');
  proxyReq.removeHeader('sec-fetch-dest');
  proxyReq.removeHeader('referer');
});
proxy.on('error', (e) => {
  console.error(e);
});

// start server
const start = ({ proxyPort, targetPort } = {}) => {
  const server = http.createServer();

  // never timeout the keep alive connection
  server.keepAliveTimeout = 0;

  server.on('request', async (req, res) => {
    console.log(new Date().toISOString(), req.method, req.url, req.rawHeaders);

    // fix cors error from dev url localhost:3000
    // should not be necessary in production build using file url
    res.setHeader('Access-Control-Allow-Origin', '*');

    proxy.web(req, res, { target: `http://localhost:${targetPort}` });
  });
  server.on('error', console.error);
  server.listen(proxyPort);
  console.log(`proxy server listening on port ${proxyPort}`);
};

module.exports = { start };

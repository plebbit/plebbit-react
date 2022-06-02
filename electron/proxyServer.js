// use this proxy server to debug ipfs api requests made by electron

const http = require('http')
const httpProxy = require('http-proxy')
const Debug = require('debug')
const debugProxy = require('debug')('proxy')
Debug.enable('proxy')

// start proxy
const proxy = httpProxy.createProxyServer({})

// rewrite the request
// proxy.on('proxyReq', function(proxyReq, req, res, options) {
// })
proxy.on('error', (e) => {
  console.error(e)
})

// start server
const start = ({proxyPort, targetPort} = {}) => {
  const server = http.createServer()

  // never timeout the keep alive connection
  server.keepAliveTimeout = 0

  server.on('request', async (req, res) => {
    debugProxy(new Date().toISOString(), req.method, req.url, req.rawHeaders)
 
    proxy.web(req, res, {target: `http://localhost:${targetPort}`})
  })
  server.on('error', console.error)
  server.listen(proxyPort)
  console.log(`proxy server listening on port ${proxyPort}`)
}

module.exports = {start}

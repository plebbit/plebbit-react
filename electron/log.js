// require this file to log to file in case there's a crash

const envPaths = require('env-paths').default('plebbit', {suffix: false})
const util = require('util')
const fs = require('fs-extra')

fs.ensureFileSync(envPaths.log)
const logFile = fs.createWriteStream(envPaths.log, {flags : 'w'})
const writeLog = (...args) => {
  logFile.write(new Date().toISOString() + ' ')
  for (const arg of args) {
    logFile.write(util.format(arg) + ' ')
  }
  logFile.write('\r\n')
}

const consoleLog = console.log
console.log = (...args) => {
  writeLog(...args)
  consoleLog(...args)
}
const consoleError = console.error
console.error = (...args) => {
  writeLog(...args)
  consoleError(...args)
}
const consoleWarn = console.warn
console.warn = (...args) => {
  writeLog(...args)
  consoleWarn(...args)
}
const consoleDebug = console.debug
console.debug = (...args) => {
  // don't add date for debug because it's usually already included
  for (const arg of args) {
    logFile.write(util.format(arg) + ' ')
  }
  logFile.write('\r\n')
  consoleDebug(...args)
}

// errors aren't console logged
process.on('uncaughtException', console.error)
process.on("unhandledRejection", console.error)

console.log(envPaths)

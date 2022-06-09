// hook that runs after electron-build

const fs = require('fs-extra')
const path = require('path')
const distFolderPath = path.resolve(__dirname, '..', 'dist')

const addPortableToPortableExecutableFileName = () => {
  const files = fs.readdirSync(distFolderPath)
  for (const file of files) {
    if (file.endsWith('.exe') && !file.match('Setup')) {
      const filePath = path.resolve(distFolderPath, file)
      const renamedFilePath = path.resolve(distFolderPath, file.replace('plebbit', 'plebbit Portable'))
      fs.moveSync(filePath, renamedFilePath)
    }
  }
}

exports.default = async (buildResult) => {
  addPortableToPortableExecutableFileName()
}

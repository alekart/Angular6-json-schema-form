const fs = require('fs');
const path = require('path');
const tar = require('tar');
const getArchiveName = require('./get-archive-name.function')

/**
 * Compress a folder into archive with specified name
 * @param archiveName {string} if the extension is provided it will be replaced by 'tgz'
 * @param sourcePath {string} the path of the folder to compress
 * @param outputPath {string} destination path for the archive file
 * @returns Promise
 */
function createTar(archiveName, sourcePath, outputPath) {
  const filename = getArchiveName(archiveName, sourcePath);
  const outputDest = !outputPath ? './' : outputPath;
  // create output folder if doesn't exist
  fs.mkdirSync(path.resolve(outputDest), { recursive: true });
  return tar.c(
    {
      gzip: true,
      file: path.resolve(`${outputDest}/${filename}`),
      cwd: path.resolve(sourcePath),
    },
    ['./'],
  );
}

module.exports = createTar;

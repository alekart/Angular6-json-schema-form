const path = require('path');

function getArchiveName(archiveName, sourcePath) {
  let filename = archiveName || path.dirname(sourcePath);
  if (!/\.tgz$/.test(filename)) {
    filename += '.tgz';
  }
  return filename;
}

module.exports = getArchiveName;

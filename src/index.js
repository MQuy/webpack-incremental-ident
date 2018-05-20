const getLocalIdent = require('./ident');
const { setConfig, importLog, exportLog } = require('./config');

const revertedIdents = new Map();
const usedIdents = new Map();

class IncrementalCSS {
  constructor(options = {}) {
    setupConfig(options);
    importLog();
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      exportLog();
      callback();
    });
  }
}

IncrementalCSS.getLocalIdent = getLocalIdent;

module.exports = IncrementalCSS;
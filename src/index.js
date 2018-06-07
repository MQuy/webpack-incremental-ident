const getLocalIdent = require("./ident");
const { setupConfig, importLog, exportLog } = require("./config");

const revertedIdents = new Map();
const usedIdents = new Map();

class IncrementalCSS {
  constructor(options = {}) {
    setupConfig(options);
    importLog();
  }

  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapAsync(
        "WebpackIncrementalIdent",
        this.handleAfterEmit,
      );
    } else {
      compiler.plugin("after-emit", this.handleAfterEmit);
    }
  }

  handleAfterEmit(compilation, callback) {
    exportLog();
    callback();
  }
}

IncrementalCSS.getLocalIdent = getLocalIdent;

module.exports = IncrementalCSS;

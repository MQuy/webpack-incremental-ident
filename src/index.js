const getLocalIdent = require("./ident");
const { setupConfig, importLog, exportLog } = require("./config");

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

  handleAfterEmit(_compilation, callback) {
    exportLog();
    callback();
  }
}

IncrementalCSS.getLocalIdent = getLocalIdent;

module.exports = IncrementalCSS;

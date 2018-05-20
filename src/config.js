const fs = require('fs');

let allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
let blacklist = [];
let logPath = '';
const idents = new Map();
const revertedIdents = new Map();
const usedIdents = new Map();

function setupConfig(options) {
  allowedCharacters = options.characters || allowedCharacters;
  logPath = options.logPath;
  blacklist = options.blacklist || blacklist;
}

function importLog() {
  if (fs.existsSync(logPath)) {
    const data = require(logPath);

    Object.keys(data.idents).forEach((key) => {
      idents.set(key, data.idents[key]);
      revertedIdents.set(data.idents[key], key);
    })
  }
}

function exportLog() {
  let jsonIdents = {};

  idents.forEach((value, key) => {
    if (usedIdents.has(key)) {
      jsonIdents[key] = value
    }
  });
  fs.writeFileSync(
    logPath,
    JSON.stringify({ idents: jsonIdents }, null, 2)
  )
}

module.exports = {
  setConfig,
  importLog,
  exportLog,
  allowedCharacters,
  blacklist,
  logPath,
  idents,
  revertedIdents,
  usedIdents
};
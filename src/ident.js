const { allowedCharacters, blacklist, idents, revertedIdents, usedIdents } = require('./config');

let indexes = [0];

function getNextIdent(key) {
  let ident = ''
  const highBound = allowedCharacters.length - 1;

  do {
    ident = indexes.map(i => allowedCharacters[i]).join('');

    let ci = 0;
    while (true) {
      if (indexes[ci] === undefined) {
        indexes.push(0);
        break;
      } else if (indexes[ci] < highBound) {
        indexes[ci] += 1;
        break;
      } else if (indexes[ci] === highBound) {
        indexes[ci] = 0;
        ci += 1;
      }
    }
  } while (revertedIdents.get(ident) || blacklist.some(regex => regex.test(ident)))

  idents.set(key, ident);
  revertedIdents.set(ident, key);
  return ident;
}

function getLocalIdent(context, localIdentName, localName, options) {
  const key = [context.resourcePath, localName].join('-');
  const ident = idents.get(key) || getNextIdent(key);

  usedIdents.set(key, ident);
  return ident;
}

module.exports = getLocalIdent;
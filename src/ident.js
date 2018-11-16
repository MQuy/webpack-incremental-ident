var loaderUtils = require("loader-utils");
var path = require("path");
const { getConfig, idents, revertedIdents, usedIdents } = require("./config");

// CSS identifier has to follow the rule https://www.w3.org/TR/CSS2/syndata.html#value-def-identifier
const validCSSIdentifier = /^[^\d(--)(-\d)]/;
let indexes = [0];

function getNextIdent(key) {
  let ident = "";
  const { allowedCharacters, blacklist } = getConfig();
  const highBound = allowedCharacters.length - 1;

  do {
    ident = indexes.map(i => allowedCharacters[i]).join("");

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
  } while (
    revertedIdents.get(ident) ||
    blacklist.some(regex => regex.test(ident)) ||
    !validCSSIdentifier.test(ident)
  );

  idents.set(key, ident);
  revertedIdents.set(ident, key);
  return ident;
}

function getLocalIdent(context, localIdentName, localName, options = {}) {
  const { fallbackIdent } = getConfig();
  const relativePath = context.resourcePath
    .replace(context.rootContext, "")
    .replace(/\\+/g, "/");
  const key = [relativePath, localName].join("-");
  const isNameExist = idents.has(key);
  const ident = isNameExist ? idents.get(key) : getNextIdent(key);

  if (fallbackIdent && !isNameExist) {
    usedIdents.set(key, ident);
    return getFallbackIdent(context, fallbackIdent, localName, options);
  } else {
    usedIdents.set(key, ident);
    return ident;
  }
}

function getFallbackIdent(loaderContext, localIdentName, localName, options) {
  if (!options.context) {
    if (loaderContext.rootContext) {
      options.context = loaderContext.rootContext;
    } else if (
      loaderContext.options &&
      typeof loaderContext.options.context === "string"
    ) {
      options.context = loaderContext.options.context;
    } else {
      options.context = loaderContext.context;
    }
  }
  var request = path.relative(options.context, loaderContext.resourcePath);
  options.content = options.hashPrefix + request + "+" + localName;
  localIdentName = localIdentName.replace(/\[local\]/gi, localName);
  var hash = loaderUtils.interpolateName(
    loaderContext,
    localIdentName,
    options,
  );
  return hash
    .replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-")
    .replace(/^((-?[0-9])|--)/, "_$1");
}

module.exports = getLocalIdent;

## Webpack Incremental Ident

Webpack plugin transform your css class name into shortest form.

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![licenses][licenses]][licenses-url]

![css](https://i.imgur.com/TkpNsCZ.png)

✍️ Using incremental class names causes problem because of two reasons:

- Webpack potentially compiles input files in different order.
- You change the order when using `require/import`.

This plugin solves the problem above by keeping track of incremental class names and reuse them for following compilings.

### Installation

Via npm:

```bash
$ npm install webpack-incremental-ident --save-dev
```

Via yarn:

```bash
$ yarn add -D webpack-incremental-ident
```

### Usage

```js
const IncrementalCSS  = require('webpack-incremental-ident');

const webpackConfig = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          getLocalIdent: IncrementalCSS.getLocalIdent,
        }
      }
    ]
  },
  plugins: [
    new IncrementalCSS({
      logPath: path.resolve(__dirname, '../stats/css.json'),
      blacklist: [/^ad$/]
    })
  ]
}
```

### Configuration

```js
new IncrementalCSS(options);
```

#### options.logPath

- Type: `String`
- Required

Path to your json file to keep track of your incremental class names.

#### options.characters

- Type: `Array`
- Default: `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_`

Characters are included in class names.

#### options.fallbackIdent

- Type: `String`
- Default: `""`

Fallback to an ident name strategy if classname doesn't exist in `logPath`

#### options.blacklist

- Type: `Array of regex`
- Default: `[]`

List of class names will be ignored for example `ad`

[npm]: https://img.shields.io/npm/v/webpack-incremental-ident.svg
[npm-url]: https://npmjs.com/package/webpack-incremental-ident
[node]: https://img.shields.io/node/v/webpack-incremental-ident.svg
[node-url]: https://nodejs.org
[deps]: https://img.shields.io/david/MQuy/webpack-incremental-ident.svg
[deps-url]: https://david-dm.org/MQuy/webpack-incremental-ident
[licenses]: https://img.shields.io/github/license/MQuy/webpack-incremental-ident.svg
[licenses-url]: https://github.com/MQuy/webpack-incremental-ident/blob/master/LICENSE

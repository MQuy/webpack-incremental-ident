## Webpack Incremental Ident

Webpack plugin transform your css class name into shortest form.

![css](https://i.imgur.com/TkpNsCZ.png)

✍️ Using incremental class names causes problem because of two reasons:
+ Webpack potentially compiles input files in different order.
+ You change the order when using `require/import`.

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
new IncrementalCSS(options)
```

#### options.logPath

+ Type: `String`
+ Required

Path to your json file to keep track of your incremental class names.

#### options.characters

+ Type: `Array`
+ Default: `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_`

Characters are included in class names.

#### options.blacklist

+ Type: `Array of regex`
+ Default: `[]`

List of class names will be ignored for example `ad`
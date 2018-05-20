## Webpack Incremental Ident

Webpack plugin transform your css class name into shortest form.

![css](https://i.imgur.com/TkpNsCZ.png)

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
    })
  ]
}
```

### Configuration

```js
new IncrementalCSS(options)
```

#### options.logPath
Path to your json file to keep track of your incremental class names.

#### options.characters
Characters will be included in class names.

#### options.blacklist
List of class names will be ignored for example `ad`
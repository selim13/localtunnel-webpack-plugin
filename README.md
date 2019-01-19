# localtunnel-webpack-plugin

> Exposes your webpack-dev-server to the internet through [localtunnel](https://localtunnel.github.io/www/).

Useful for sharing your current work with others or remotely testing service workers.

## Installation

```
npm install --save-dev localtunnel-webpack-plugin
```

or

```
yarn add -D localtunnel-webpack-plugin
```

## Usage

Example webpack config:

```javascript
const LocaltunnelPlugin = require('localtunnel-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new LocaltunnelPlugin({ localtunnel: { subdomain: 'example-subdomain' } }),
  ],
  devServer: {
    // ...
    public: 'example-subdomain.localtunnel.me',
  },
};
```

Plugin will pick up host and port of the dev server unless others provided.

For hot reloading to work properly you will need to manually set both
localtunnel subdomain and the dev server public url .

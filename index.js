const localtunnel = require('localtunnel');
const log = require('webpack-log')({ name: 'localtunnel' });

function color(useColor, msg) {
  if (useColor) return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`;

  return msg;
}

function connect(options) {
  localtunnel(options.port, options.localtunnel, (err, tunnel) => {
    if (err) {
      throw err;
    }

    log.info(`Tunnel url: ${color(true, tunnel.url)}`);

    tunnel.on('error', err => {
      tunnel.close();

      if (options.reconnect) {
        log.warn(
          `Connection with tunnel lost: ${err.message}, reconnecting...`
        );

        setTimeout(() => {
          connect(options);
        }, options.reconnectInterval);
      } else {
        throw err;
      }
    });
  });
}

class LocaltunnelWebpackPlugin {
  constructor(options) {
    options = options || {};
    this.options = {
      reconnect: true,
      reconnectInterval: 1000,
      localtunnel: {},
      ...options,
    };
  }

  apply(compiler) {
    if (!compiler.options.devServer) return;

    this.options.port = this.options.port || compiler.options.devServer.port;
    this.options.localtunnel = {
      local_host: compiler.options.devServer.host,
      ...this.options.localtunnel,
    };

    connect(this.options);
  }
}

module.exports = LocaltunnelWebpackPlugin;

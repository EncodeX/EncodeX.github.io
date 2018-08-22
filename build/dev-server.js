const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const port = 8099;
const portfinder = require('portfinder');

const reporter = require('./dev-server-reporter');

portfinder.basePort = port;

const app = express();
const config = require('./webpack.dev.js');

const compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  logLevel: 'silent',
  reporter,
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000,
});

app.use(hotMiddleware);

// compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
//   hotMiddleware.publish({
//     action: 'reload',
//   });
// });

app.use(devMiddleware);

// serve pure static assets
const staticPath = path.posix.join('/', 'public');
app.use(staticPath, express.static('./public'));

const uri = 'dev.diip.in';

let resolveReady;
let rejectReady;
const readyPromise = new Promise((resolve, reject) => {
  resolveReady = resolve;
  rejectReady = reject;
});

let server;

devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, p) => {
    if (err) {
      rejectReady(err);
    }

    process.env.PORT = p;

    console.log(`> Listening at http://${uri}:${p}\n`);

    app.listen(p, uri);
    resolveReady();
  });
});

module.exports = {
  ready: readyPromise,
  close: () => server.close(),
};

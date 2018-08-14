const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const port = 8099;
const portfinder = require('portfinder');

portfinder.basePort = port;

const app = express();
const config = require('./webpack.config.js');

const compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
});

app.use(require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000,
}));

app.use(devMiddleware);

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

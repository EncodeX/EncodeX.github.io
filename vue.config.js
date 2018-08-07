module.exports = {
  devServer: {
    host: 'dev.diip.in',
    port: 8099
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
};

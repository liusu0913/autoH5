module.exports = {
  assetsDir: 'h5',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://localhost:3000',
        /* 允许跨域 */
        changeOrigin: true,
      }
    },
  }
}
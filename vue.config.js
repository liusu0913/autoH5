const glob = require('glob')

const entryFiles = glob.sync('**/*.js', {
  root: './src/project',
  cwd: './src/project',
  absolute: true
})
// {
//   auto: 'src/project/autoH5/main.js',
//   dome: 'src/project/dome/main.js',
// }
const pages = {}
entryFiles.forEach(path => {
  const key = path.split('/src/project/')[1].split('/')[0]
  pages[key] = `src/project/${key}/main.js`
})
module.exports = {
  assetsDir: 'h5',
  pages,
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
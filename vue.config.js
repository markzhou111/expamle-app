const path = require('path')
const { defineConfig } = require('@vue/cli-service')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // port: port,
    open: true,
    proxy: {
      [process.env.VUE_APP_ZYH_BASE_API]: {
        target: 'http://918admin.zyhtk.com',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_ZYH_BASE_API]: ''
        }
      },
      [process.env.VUE_APP_BXJ_BASE_API]: {
        target: 'http://918admin.bxjtuku.com',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BXJ_BASE_API]: ''
        }
      }
    }
  },  
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    devtool: 'source-map'
  }  
})

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

//追加
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/calorie-calculation-app/'   //任意
    : '/'
}
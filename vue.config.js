const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {
    //proxy: 'http://192.168.25.47:8080/api'
    //proxy: 'http://192.168.45.131:8080/api'
    proxy: 'http://192.168.72.91:8080/api'
  }
})

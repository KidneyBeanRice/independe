const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {
<<<<<<< HEAD
<<<<<<< HEAD
    //proxy: 'http://192.168.25.47:8080/api'
    //proxy: 'http://192.168.45.131:8080/api'
    proxy: 'http://192.168.72.91:8080/api'
=======
    proxy: 'http://192.168.25.47:8080/api'
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
=======
    proxy: 'http://192.168.25.47:8080/api'
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
  }
})

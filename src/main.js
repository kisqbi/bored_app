import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index.js'
import vuetify from './plugins/vuetify';



Vue.config.productionTip = false

Vue.config.API_URL = process.env.VUE_APP_API_URL
Vue.config.BASE_URL = process.env.VUE_APP_BASE_URL
if(process.env.VUE_APP_NODE_ENV==='development'){
  Vue.config.API_URL = '/';

}
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

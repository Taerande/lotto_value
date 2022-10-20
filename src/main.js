import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import store from './store';
import Ads from 'vue-google-adsense'

Vue.use(Ads.Adsense);
Vue.use(require('vue-script2'))

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

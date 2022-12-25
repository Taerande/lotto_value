import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './plugins/firebase'
import router from './router';
import store from './store';
import './plugins/filter.js'
import axios from 'axios'

Vue.use(require('vue-script2'))

Vue.prototype.$store = store;
Vue.prototype.$axios = axios;


new Vue({
  axios,
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
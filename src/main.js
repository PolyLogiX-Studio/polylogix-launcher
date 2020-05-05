import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import { Pano } from 'vuejs-vr'
// import 'vue-video-player/src/custom-theme.css'


Vue.config.productionTip = false
new Vue({
  Pano,
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

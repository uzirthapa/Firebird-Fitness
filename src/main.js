import Vue from 'vue'
import './plugins/vuetify'

import App from './App.vue'
import router from "./router";
import firebase from './firebase'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

export const bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

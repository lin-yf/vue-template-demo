// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store/'
import {
  Icon
} from 'ant-design-vue'
Vue.use(Icon)
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'
// Vue.config.productionTip = false

// use pro-layout components
new Vue({
  router,
  // store,
  // init localstorage, vuex
  render: h => h(App)
}).$mount('#app')

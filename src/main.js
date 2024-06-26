import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import store from './store'

Vue.use(ElementUI, {
  size: 'small'
})
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

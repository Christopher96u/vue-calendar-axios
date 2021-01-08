import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import vueaxios from '@/plugins/vue-axios'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  vueaxios,
  render: function (h) { return h(App) }
}).$mount('#app')

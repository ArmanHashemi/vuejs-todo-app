// IMPORT PACKAGES
import Vue from 'vue'
import App from './App.vue'
import VueModular from '@/core/vueModular/vueModular'
import VueCompositionAPI from '@vue/composition-api'

// IMPORT MODULES
import i18n from '@/core/localization'
import router from '@/router'
import Home from '@/home'

// IMPORT FILES
import '@/core/di/lazyInject'
import './registerServiceWorker'
import '@/uikit/css/main.scss'


Vue.config.productionTip = false

Vue.use(VueCompositionAPI)
Vue.use(VueModular, {
  // PLACE IMPORTED MODULES HERE FOR GLOBAL SCOPE
  modules: {
    Home
  },
  router
})
export const app = new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

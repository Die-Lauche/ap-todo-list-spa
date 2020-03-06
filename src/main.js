import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import Unicon from 'vue-unicons'
import { uniUserCircle, uniArrowLeft } from 'vue-unicons/src/icons'

import './server'

Unicon.add([uniUserCircle, uniArrowLeft])
Vue.use(Unicon)

Vue.use(VModal, { dynamic: true })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  created () {
    if (sessionStorage.getItem('user')) {
      console.log('Restoring user from session')
      const user = JSON.parse(sessionStorage.getItem('user'))
      this.$store.dispatch('Users/setUser', user)
    }
  },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')

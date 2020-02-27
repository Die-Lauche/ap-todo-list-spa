import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Overview from '../views/Overview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router

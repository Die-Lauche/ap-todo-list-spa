import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '../views/Overview'
import Details from '../views/Details'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Overview
  },
  {
    path: '/list/:listId',
    name: 'details',
    component: Details,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router

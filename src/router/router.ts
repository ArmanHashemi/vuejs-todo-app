import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

export const ROUTER_TYPE = Symbol('ROUTER_TYPE')

const routes: Array<RouteConfig> = []

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

// MIDDLEWARE FOR RESTRICTION OR PROTECT ROUTES
Vue.mixin({
  beforeRouteEnter (_to, _from, next) {
    // ALL ROUTE ACCESSIBLE
    next()
  }
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import CreateWallet from '@/components/CreateWallet'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'CreateWallet',
    component: CreateWallet
  }]
})

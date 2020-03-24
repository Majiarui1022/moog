import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import showData from '@/components/showData'
import dataBrowser from '@/components/dataBrowser'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/showData',
      name: 'showData',
      component: showData
    },
    {
      path: '/dataBrowser',
      name: 'dataBrowser',
      component: dataBrowser
    }
  ]
})

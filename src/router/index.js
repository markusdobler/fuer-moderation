import { createRouter, createWebHashHistory } from 'vue-router'
import CardView from '../views/CardView.vue'
import ChangeLog from '../views/ChangeLog.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/card/1'
    },
    {
      path: '/card/:i',
      name: 'card',
      props: route => ({ i: Number(route.params.i) }),
      component: CardView
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: ChangeLog
    }
  ]
})

export default router

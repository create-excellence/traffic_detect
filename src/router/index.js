import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/foo', component: () => import('../views/center') },
  { path: '/bar', component: () => import('../views/center') },
  {
    path: '/center',
    component: () => import('../views/center'),
    children: [
      {
        path: '',
        component: () => import('../views/dashbord'),
      },
      {
        path: 'monitor',
        component: () => import('../views/monitor'),
      },
      {
        path: 'dashboard',
        component: () => import('../views/dashbord'),
      },
      {
        path: 'devices',
        component: () => import('../views/devices'),
      },
      {
        path: 'user',
        component: () => import('../views/user'),
      },
      {
        path: 'snapshot',
        component: () => import('../views/snapshot'),
      },
      {
        path: 'analyze',
        component: () => import('../views/analyze'),
      },
      {
        path: 'settings',
        component: () => import('../views/settings'),
      },
    ],
  },
  {
    path: '/yolo/:id',
    component: () => import('../views/yolo'),
  },
  {
    path: '/login',
    component: () => import('../views/login'),
  },
]

const router = new VueRouter({
  routes,
})

export default router

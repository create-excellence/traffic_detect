import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/foo', component: () => import('../views/center') },
    { path: '/bar', component: () => import('../views/center') },
    {
        path:'/center',
        component: ()=>import('../views/center'),
        children:[
            {
                path:'',
                component:() => import('../views/dashbord'),
            },
            {
                path:'dashboard',
                component:() => import('../views/dashbord'),
            },
            {
                path:'settings',
                component:() => import('../views/settings'),
            },
        ]
    },
    {
        path:'/yolo/:id',
        component:() => import('../views/yolo'),
    },
]

const router = new VueRouter({
    routes
})

export default router
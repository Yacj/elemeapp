import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: () => import('../views/Home')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '用户登录',
            isLogin: false
        },
        component: () => import('../views/user/login')
    },
    {
        path: '/address',
        name: 'address',
        meta: {
            title: '选择收货地址'
        },
        component: () => import('../views/address/address')
    },
    {
      path: '/city',
      name:'city',
      meta: {
          title: '城市选择'
      },
      component:()=> import('../views/address/city')
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '我的',
            isLogin: true
        },
        component: () => import('../views/user/user')
    },
    {
        path: '/order',
        name: 'order',
        meta: {
            title: '订单',
            isLogin: true
        },
        component: () => import('../views/order/order')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router

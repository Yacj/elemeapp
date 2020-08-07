import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.scss'
import {cookie} from "@/util/util";
import './vant/index'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta.isLogin) {
        //页面是否登录
        if (cookie.getCookie("token")) {
            next(); //表示已经登录
        } else {
            next({
                path: '/login',
            })
            next()
        }
    }
    next()
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

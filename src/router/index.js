import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/auth/Login'
import Layout from '../views/Layout'
import store from '../store/index'
import iview from 'iview'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/user/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'home',
            component: Layout
        },

        {
            path: '/system',
            name: 'system',
            component: Layout,
            children: [
                {
                    path: 'user',
                    name: 'usermanger',
                    component: () => import('../views/system/User')
                },
                {
                    path: 'role',
                    name: 'rolemanger',
                    component: () => import('../views/system/Role')
                },
            ]
        }
    ]
})


router.beforeEach((to, form, next) => {
    iview.LoadingBar.start();
    if (store.getters.user == null) {
        store.dispatch('getUserInfo').then(res => {
            next();
        });
    } else {
        next()
    }
})

router.afterEach(to => {
    iview.LoadingBar.finish()
    window.scrollTo(0, 0)
})


export default router;
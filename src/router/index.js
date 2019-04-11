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
                {
                    path: 'policy',
                    name: 'policy',
                    component: () => import('../views/system/Policy')
                },
            ]
        },

        {
            path: '/state',
            name: 'state',
            component: Layout,
            children: [
                {
                    path: 'list',
                    name: 'statelist',
                    component: () => import('../views/state/List')
                },
                {
                    path: 'activty',
                    name: 'stateactivty',
                    component: () => import('../views/state/Activty')
                },
            ]
        },

        {
            path: '/strategy',
            name: 'strategy',
            component: Layout,
            children: [
                {
                    path: 'list',
                    name: 'strategy_list',
                    component: () => import('../views/strategy/List')
                }
            ]
        },

        {
            path: '/customer',
            name: 'customer',
            component: Layout,
            children: [
                {
                    path: 'list',
                    name: 'customer_list',
                    component: () => import('../views/customer/List')
                }
            ]
        }

    ]
})


router.beforeEach((to, form, next) => {
    iview.LoadingBar.start();
    //没有用户信息，获取后跳转//
    if (store.getters.user == null && to.name !== 'login') {
        store.dispatch('getUserInfo').then(res => {
            if (res.data.code == 200) {
                next();
            } else {
                next({name: 'login'})
            }
        })
    } else {
        next();
    }
})

router.afterEach(to => {
    iview.LoadingBar.finish()
    window.scrollTo(0, 0)
})


export default router;
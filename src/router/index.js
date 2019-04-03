import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/auth/Login'
import Layout from '../views/Layout'

Vue.use(Router)

export default new Router({
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
                }
            ]
        }
    ]
})

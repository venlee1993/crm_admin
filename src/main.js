import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Iview from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/reset.css'

Vue.use(Iview, {
    transfer: true
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

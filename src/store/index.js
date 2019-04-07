import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        perssion: ['admin']
    },
    mutations: {
        LOGIN(state, data) {
            state.user = data;
        },
        LOGOUT() {
            state.user = {}
        },
        INIT_USER() {

        }
    },
    actions: {}
})

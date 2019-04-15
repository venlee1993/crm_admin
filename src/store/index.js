import Vue from 'vue'
import Vuex from 'vuex'
import {getCurrentUser} from '../service/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
    },
    getters: {
        user(state) {
            return state.user
        },
        permissions(state) {
            return state.user.permissions
        },
        roles(state) {
            return state.user.roles
        }
    },
    mutations: {
        LOGIN(state, data) {
            state.user = data;
        },
        LOGOUT(state) {
            state.user = {}
        },
        INIT_USER(state, data) {
            state.user = data
        }
    },
    actions: {
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                try {
                    getCurrentUser().then(res => {
                        if (res.data.code == 200 && res.data.data) {
                            commit('INIT_USER', res.data.data)
                        }
                        resolve(res)
                    }).catch(error => {
                        reject(error)
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
})

import Vue from 'nativescript-vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        view: 'Login',
        user: {}
    },
    mutations: {
        setView(state, view) {
            state.view = view
        },
        setUser(state, user) {
            state.user = user
        },
        setCheckin(state, checkin) {
            state.user.checkin = checkin
        }
    }
})

export default store
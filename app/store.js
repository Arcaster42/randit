import Vue from 'nativescript-vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        view: 'Login',
        username: null
    },
    mutations: {
        setView(state, view) {
            state.view = view
        }
    }
})

export default store
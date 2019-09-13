import Vue from 'nativescript-vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import moment from 'moment'
// require('nativescript-websockets')

// const socket = new WebSocket('ws://192.168.10.59:3001')

const store = new Vuex.Store({
    state: {
        view: 'Login',
        showCheckin: false,
        user: {}
    },
    mutations: {
        setView(state, view) {
            state.view = view
        },
        setUser(state, user) {
            state.user = user
        },
        setCheckinStart(state) {
            state.user.checkin.start = moment()
        },
        stopCheckin(state) {
            state.user.checkin.active = false
        },
        setShowCheckin(state, value) {
            state.showCheckin = value
        }
    }
})

export default store
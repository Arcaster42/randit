import Vue from "nativescript-vue";
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store'
import Home from "./components/Home";

Vue.config.silent = false

new Vue({
    store,
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();

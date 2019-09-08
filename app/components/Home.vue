<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="getView"></Label>
        </ActionBar>
        <StackLayout>
            <Login v-if="getView==='Login'"/>
            <Register v-if="getView==='Register'"/>
            <Hub v-if="getView==='Hub'"/>
        </StackLayout>
    </Page>
</template>

<script>
import Login from './Login'
import Register from './Register'
import Hub from './Hub'
    export default {
        components: {
            Login,
            Register,
            Hub
        },
        computed: {
            getView() {
                return this.$store.state.view;
            }
        },
        methods: {

        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .info {
        font-size: 20;
    }

    .input {
        border-color: seagreen;
        border-width: 5px;
        border-radius: 30%;
        padding: 20px;
        width: 80%;
    }

    .layout {
        background-color: whitesmoke;
    }
</style>

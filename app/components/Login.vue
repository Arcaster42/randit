<template>
    <FlexboxLayout class="layout" flexDirection="column" justifyContent="center">
        <Label alignSelf="center" text="Username"/>
        <TextField class="input" alignSelf="center" v-model="username" hint="Enter Username"/>
        <Label alignSelf="center" text="Password"/>
        <TextField class="input" alignSelf="center" v-model="password" hint="Enter Username"/>
        <Button class="btn btn-primary btn-active" text="Login" @tap="loginTap"/>
        <Button class="btn btn-primary btn-active" text="Register" @tap="registerTap"/>
    </FlexboxLayout>
</template>

<script>
export default {
    data: () => ({
        username: null,
        password: null
    }),
    methods: {
        loginTap() {

        },
        registerTap() {
            this.$store.commit('setView', 'Register')
        }
    }
}
</script>

<style scoped>
    .input {
        border-color: seagreen;
        border-width: 5px;
        border-radius: 30%;
        padding: 20px;
        width: 80%;
    }

    .layout {
        background-color: white;
        animation-name: fade-in;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
<template>
    <FlexboxLayout class="layout" flexDirection="column" justifyContent="center">
        <Label class='label' text="Username"/>
        <TextField class="input" alignSelf="center" v-model="username" hint="Enter Username"/>
        <Label class='label' text="Email"/>
        <TextField class="input" alignSelf="center" v-model="email" hint="Enter Email"/>
        <Label class='label' text="Password"/>
        <TextField class="input" alignSelf="center" v-model="password" hint="Enter Password"/>
        <Label class='label' text="Password"/>
        <TextField class="input" alignSelf="center" v-model="password2" hint="Confirm Password"/>
        <Button class="btn btn-primary btn-active" text="Register" @tap="registerTap"/>
        <Button class="btn btn-primary btn-active" text="Cancel" @tap="cancelTap"/>
    </FlexboxLayout>
</template>

<script>
export default {
    data: () => ({
        username: null,
        email: null,
        password: null,
        password2: null
    }),
    methods: {
        registerTap() {

        },
        cancelTap() {
            this.$store.commit('setView', 'Login')
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

    .label {
        align-self: center;
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
<template>
    <FlexboxLayout class="layout" flexDirection="column" justifyContent="center">
        <Label alignSelf="center" text="E-Mail"/>
        <TextField class="input" alignSelf="center" v-model="email" hint="Enter E-mail"/>
        <Label alignSelf="center" text="Password"/>
        <TextField class="input" alignSelf="center" v-model="password" hint="Enter Password"/>
        <Button class="btn btn-primary btn-active" text="Login" @tap="loginTap"/>
        <Button class="btn btn-primary btn-active" text="Register" @tap="registerTap"/>
    </FlexboxLayout>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        email: null,
        password: null
    }),
    methods: {
        loginTap() {
            const userObj = {
                email: this.email,
                password: this.password
            }
            axios.get('http://192.168.1.6:3000/api/user', { params: userObj })
            .then((response) => {
                if (response.data.err) alert(response.data.err)
                else {
                    console.log(response.data)
                }
            })
            .catch((err) => alert(err))
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
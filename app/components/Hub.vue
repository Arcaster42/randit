<template>
    <FlexboxLayout class="layout">
        <Button v-if="!getActive" class="btn btn-primary btn-active" :text="label" @tap="newTap"/>
        <Label v-if="getActive" class="label" :text="getDuration"/>
        <Button v-if="getActive" class="btn btn-primary btn-active" text="Check In" @tap="checkinTap"/>
        <Button v-if="getActive" class="btn btn-primary btn-active" text="Safe" @tap="safeTap"/>
        <Checkin v-if='getShowCheckin'/>
        <Button class="btn btn-danger btn-active" text="Logout" @tap="logoutTap"/>
    </FlexboxLayout>
</template>

<script>
import Checkin from './Checkin'
import axios from 'axios'
import moment from 'moment'

export default {
    components: {
        Checkin
    },
    created () {
        setInterval(() => {
            if (this.$store.state.user.email && this.$store.state.user.checkin.active) {
                const userObj = {
                    email: this.$store.state.user.email
                }
                axios.get('http://192.168.1.6:3000/api/checkin', {
                    params: userObj
                })
                .then((response) => {
                    console.log(response.data)
                    this.$store.commit('setUser', response.data)
                })
            }
        }, 60000)
    },
    data: () => ({
        label: 'New Checkin-In',
        showCheckin: false,
        buttonText: null
    }),
    mounted: function() {
        this.buttonText = this.getText()
    },
    computed: {
        getActive() {
            return this.$store.state.user.checkin.active
        },
        getShowCheckin() {
            return this.$store.state.showCheckin
        },
        getDuration() {
                const start = this.$store.state.user.checkin.start
                const duration = this.$store.state.user.checkin.timeleft
                const difference = Math.ceil(duration - moment.duration(moment().diff(start)).asMinutes())
                if (difference <= 0) return 'Check-In Missed - Alert Sent'
                return `${difference} Minutes Remaining`
        },
        getMessage() {
            return this.$store.state.user.checkin.message
        }
    },
    methods: {
        getText() {
            if (!this.$store.state.user.checkin.active) return 'New Check-In'
            if (this.$store.state.user.checkin.active) return 'Check-In'
        },
        newTap() {
            if (!this.$store.state.showCheckin) {
                this.$store.commit('setShowCheckin', true)
                this.label = 'Cancel Check-In'
            }
            else if (this.$store.state.showCheckin) {
                this.$store.commit('setShowCheckin', false)
                this.label = 'New Check-In'
            }
        },
        checkinTap() {
            const checkin = {
                active: true,
                start: moment(),
                end: moment().add(this.$store.state.user.checkin.timeleft),
                timeleft: this.$store.state.user.checkin.timeleft,
                message: this.$store.state.user.checkin.message

            }
            this.$store.commit('setCheckinStart')
            axios.post('http://192.168.1.6:3000/api/checkin', {
                user: this.$store.state.user,
                checkin
            })
            .then((result) => {
                console.log(result.data)
            })
        },
        safeTap() {
            const checkin = {
                active: false,
            }
            axios.post('http://192.168.1.6:3000/api/checkin', {
                user: this.$store.state.user,
                checkin
            })
            .then((result) => {
                console.log(result.data)
                this.$store.commit('setView', 'Login')
                this.$store.commit('setUser', result.data)
            })
            .catch((err) => alert(err))
        },
        logoutTap() {
            this.$store.commit('setView', 'Login')
            this.$store.commit('setUser', {})
        }
    }
}
</script>

<style scoped>
    .input {
        width: 80%;
    }

    .label {
        align-self: center;
        text-align: center;
        padding: 5px;
        margin: 15px;
        width: 100%;
    }
    
    .layout {
        flex-direction: column;
        justify-content: center;
        margin-top: 10px;
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
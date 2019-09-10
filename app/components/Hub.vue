<template>
    <FlexboxLayout class="layout">
        <Button v-if="!getActive" class="btn btn-primary btn-active" :text="label" @tap="checkinTap"/>
        <Checkin v-if='showCheckin'/>
        <Button class="btn btn-danger btn-active" text="Logout" @tap="logoutTap"/>
    </FlexboxLayout>
</template>

<script>
import Checkin from './Checkin'

export default {
    components: {
        Checkin
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
        }
    },
    methods: {
        getText() {
            if (!this.$store.state.user.checkin.active) return 'New Check-In'
            if (this.$store.state.user.checkin.active) return 'Check-In'
        },
        checkinTap() {
            if (!this.$store.state.user.checkin.active && !this.showCheckin) {
                this.showCheckin = true
                this.label = 'Cancel Check-In'
            } else
            if (!this.$store.state.user.checkin.active && this.showCheckin) {
                this.showCheckin = false
                this.label = 'New Check-In'
            } else
            if (this.$store.state.user.checkin.active) {
                const checkin = { active: false }
                this.$store.commit('setCheckin', checkin)
            }
        },
        logoutTap() {
            this.$store.commit('setView', 'Login')
        }
    }
}
</script>

<style scoped>
    .input {
        width: 80%;
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
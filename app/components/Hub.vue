<template>
    <FlexboxLayout class="layout">
        <Button v-if="!getActive" class="btn btn-primary btn-active" text="New Check-In" @tap="checkinTap"/>
        <Button v-if="getActive" class="btn btn-primary btn-active" text="Check-In" @tap="checkinTap"/>
    </FlexboxLayout>
</template>

<script>
export default {
    data: () => ({
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
            if (!this.$store.state.user.checkin.active) {
                const checkin = { active: true }
                this.$store.commit('setCheckin', checkin)
            }
            if (this.$store.state.user.checkin.active) {
                const checkin = { active: false }
                this.$store.commit('setCheckin', checkin)
            }
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
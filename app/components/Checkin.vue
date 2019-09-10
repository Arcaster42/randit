<template>
    <FlexboxLayout class="layout">
        <Label class="label" text="Duration"/>
        <Button class="btn btn-primary btn-active" :text="duration" @tap="durationTap"/>
        <Label class="label" text="Location"/>
        <TextField class="input" v-model="location"/>
        <Label class="label" text="Emergency Mesage"/>
        <TextField class="input" v-model="message"/>
        <Button class="btn btn-primary btn-active" text="Confirm" @tap="confirmTap"/>
    </FlexboxLayout>
</template>

<script>
export default {
    data: () => ({
        location: null,
        message: null,
        duration: 0,
        durations: [
            { duration: 30, option: '30 Minutes' },
            { duration: 60, option: '60 Minutes' },
            { duration: 120, option: '2 Hours' },
            { duration: 240, option: '4 Hours' },
            { duration: 360, option: '6 Hours' },
            { duration: 720, option: '12 Hours' },
            { duration: 960, option: '16 Hours' },
            { duration: 1440, option: '24 Hours' },
            { duration: 2880, option: '48 Hours' }
        ]
    }),
    methods: {
        durationTap () {
            action('Select Check-In Duration', 'Cancel', [
                this.durations[0].option,
                this.durations[1].option,
                this.durations[2].option,
                this.durations[3].option,
                this.durations[4].option
            ])
            .then((result) => {
                alert(result)
            })
        },
        confirmTap () {
            
        }
    }
}
</script>

<style scoped>
    .layout {
        flex-direction: column;
        justify-content: center;
    }

    .label {
        align-self: center;
    }

    .input {
        border-color: seagreen;
        border-width: 5px;
        border-radius: 30%;
        padding: 20px;
        width: 80%;
        align-self: center;
    }
</style>
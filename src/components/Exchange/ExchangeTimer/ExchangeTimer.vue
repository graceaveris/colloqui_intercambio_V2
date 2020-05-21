  
<template>
    <div>
        <div>
            <div class="clock">{{counter}}</div>
            <div class="time-remaining">{{isPaused}}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
    .clock {
        font-size: 4rem;
        color: lightgrey;
    }
    .time-remaining {
        font-size: 1rem;
        color: lightgrey;
    }
</style>

<script>
    export default {
        name: 'ExchangeTimer', 
        props: {
            counter: null,
            isPaused: null,
        },
    }
</script>
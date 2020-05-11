  
<template>
    <div>
        <div>
            <div class="clock">02:19</div>
            <div class="time-remaining">Time remaining</div>
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
        }

    }
</script>
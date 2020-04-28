  
<template>
<div>
    <div class="friend">
        <div>{{friend.name}}</div>
         <div class="online-indicator" v-if="friend.isOnline" ></div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.online-indicator {
        background-color: rgb(92, 240, 183);
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-left: 8px;
    }

    .friend {
        display: flex;
        align-items: center;
        padding: 3px 10px;
    }


</style>


<script>
export default {
    name: 'Friend',
    props: {
        friend: null,
    },
}
</script>
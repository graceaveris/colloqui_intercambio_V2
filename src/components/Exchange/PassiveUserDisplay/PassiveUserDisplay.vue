  
<template>
    <div>
        <div>
            <h4>{{currentTalkPoint.passiveUser.mainContent.targetLang}}</h4>
            <p>{{currentTalkPoint.passiveUser.mainContent.translation}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
</style>

<script>
    export default {
        name: 'PassiveUserDisplay', 
        props: {
            currentTalkPoint: null,
        }
    }
</script>
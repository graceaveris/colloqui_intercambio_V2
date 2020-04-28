  
<template>
    <div>
        <div>
            <h4>{{currentTalkPoint.activeUser.mainContent.targetLang}}</h4>
            <p>{{currentTalkPoint.activeUser.mainContent.translation}}</p>
        </div>
        <div>
            <h4>{{currentTalkPoint.activeUser.prompts}}</h4>
        </div>
        <div>
            <h4>{{currentTalkPoint.activeUser.vocab}}</h4>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
</style>

<script>
    export default {
        name: 'ActiveUserDisplay', 
        props: {
            currentTalkPoint: null,
        }
    }
</script>
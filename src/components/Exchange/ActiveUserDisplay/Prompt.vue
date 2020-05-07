  
<template>
    <div class="prompt">
        <h4>{{prompt.targetLang}}</h4>
        <p>{{prompt.translation}}</p>
    </div>
</template>

<style lang="scss" scoped> 
.prompt {
    padding: 15px;
}
</style>

<script>
    export default {
        name: 'Prompt', 
        props: {
            prompt: null,
        }
    }
</script>
  
<template>
    <div class="word">
        <h4>{{word.targetLang}}</h4>
        <p class="translation">{{word.translation}}</p>
    </div>
</template>

<style lang="scss" scoped> 
.word {
    padding: 15px;
}
</style>

<script>
    export default {
        name: 'Word', 
        props: {
            word: null,
        }
    }
</script>
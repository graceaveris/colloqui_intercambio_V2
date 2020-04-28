  
<template>
    <div class="lang-display">
        <h2>
        {{getPhrase}}
        </h2>
        <p>
        {{getTranslation}}
        </p>
    </div>
</template>

<style lang="scss" scoped> 
    .lang-display{
        padding: 20px;
    }
</style>

<script>
    export default {
        name: 'LangDisplay', 
        data() {
            return {
                englishPhrase: "Time to speak in English",
                englishPhraseTranslation: "Ahora habla en ingles",
                spanishPhrase: "Ahora habla en Espanol",
                spanishPhraseTranslation: "Time to speak in Spanish"
            }
        },
        computed: {
            getPhrase() {
                if (this.currentLang === "english") {
                    return this.englishPhrase
                } else {
                    return this.spanishPhrase
                }
            },
            getTranslation() {
                if (this.currentLang === "english") {
                    return this.englishPhraseTranslation
                } else {
                    return this.spanishPhraseTranslation
                }
            }
        },
        props: {
            currentLang: null,
        },
    }
</script>
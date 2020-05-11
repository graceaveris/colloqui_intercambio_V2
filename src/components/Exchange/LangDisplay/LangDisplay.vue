  
<template>
    <div class="lang-display">
        <div class="icon">
            <img v-if="this.currentLang === 'spanish'" src="../../../assets/images/spain.png"/>
            <img v-else src="../../../assets/images/united-kingdom.png"/>
        </div>
        <div class="text">
            <h2>{{getPhrase}}</h2>
            <p class="translation">{{getTranslation}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
    .lang-display{
        padding: 30px 15px;
        display: flex;
        align-items: center;
    }

    .text {
        text-align: left;
        padding-left: 20px;
    }

    .translation {
        font-size: .8rem;
        font-style: italic;
        font-weight: 600;
    }

    .icon {
        margin-left: 2rem;
        height: 6rem;
        width: 6rem;
    }

    img {
        height: 6rem;
        width: 6rem;
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
            },
        },
        props: {
            currentLang: null,
        },
    }
</script>
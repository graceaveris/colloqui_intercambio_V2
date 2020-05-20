  
<template>
    <div>
        <div class="game-type">
            <h4>This is a guessing game</h4>
            <div class="translation">Esto es juego de algo</div>
        </div>

        <div class="main-content">
            <h1>Your partner will guess the <span>{{currentTalkPoint.activeUser.mainContent.targetLang}}</span> pictured below</h1>
            <h5>By asking questions in English</h5>
            <div class="translation">Tu pareja adivinará la {{currentTalkPoint.activeUser.mainContent.translation}} haciendo preguntas en inglés</div>
        </div>

        <div class="secondary-content">
            <div class="image">
                <img :src="currentTalkPoint.imageUrl" />
            </div>

            <div class="text">
                <h1>{{currentTalkPoint.passiveUser.mainContent.targetLang}}</h1>
                <p class="translation">{{currentTalkPoint.passiveUser.mainContent.translation}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
    .game-type {
        text-align: left;
        margin-left: 30px;
        padding: 10px;
    }
    .main-content {
        background-color: white;
        margin: 30px;
        padding: 20px;
        justify-content: center; 
        line-height: 1.7;

        span {
            text-decoration: underline;
        }
    }
    .secondary-content {
        padding: 20px;
        display: flex;
        .image {
            margin: 10px;
            width: 70%;
            background-color: white;
        }
        .text {
            text-align: left;
            margin: 10px;
            padding-left: 10px;
        }

    }
</style>

<script>
    export default {
        name: 'PassiveUserDisplay', 

        props: {
            currentTalkPoint: null,
        },
    }
</script>
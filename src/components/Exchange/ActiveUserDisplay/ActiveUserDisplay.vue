  
<template>
    <div>
        <!-- Main content --><!-- Will need to add if type === guess -->
        <div class="game-type">
            <h4>Let's play a guessing game!</h4>
            <div class="translation">Jugamos juego de algo</div>
        </div>

        <div class="main-content">
            <h1>guess what <span>{{currentTalkPoint.activeUser.mainContent.targetLang}}</span> your partner is looking at</h1>
            <div class="translation">Adivina qué {{currentTalkPoint.activeUser.mainContent.translation}} está mirando tu pareja</div>
        </div>

        <div class="show-helpers" @click="toggleHelpers">
            <h5>Show Helpers 
                <span v-if="!this.showHelpers">&#43;</span>
                <span v-else>&#8722;</span>
            </h5>
            <div class="line"></div>
        </div>

        <div v-if="this.showHelpers" class="helpers">
            <!-- Prompts -->
            <div class="prompts">
                <div v-for="prompt in currentTalkPoint.activeUser.prompts" :key="prompt.translation">
                <Prompt :prompt="prompt" />
                </div>
            </div>
            <!-- Vocab -->
            <div>
                <div class="vocab">
                    <div v-for="word in currentTalkPoint.activeUser.vocab" :key="word.translation">
                    <Word :word="word" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Prompt from '@/components/Exchange/ActiveUserDisplay/Prompt'
import Word from '@/components/Exchange/ActiveUserDisplay/Word'
    export default {
        name: 'ActiveUserDisplay', 
        components: { Prompt, Word },
        props: {
            currentTalkPoint: null,
        },
        data() {
            return {
                showHelpers: false,
            }
        },
        computed: {
            getPrompts() {
                return this.currentTalkPoint.activeUser.prompts.forEach(prompt => {
                    return prompt.targetLang
                });
            },
        },
        methods: {
            toggleHelpers() {
                if (this.showHelpers) {
                    this.showHelpers = false
                } else {
                    this.showHelpers = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped> 
    .main-content {
        background-color: white;
        margin: 30px;
        padding: 20px;
        justify-content: center; 
        line-height: 1.7;

        span {
            font-size: 3.5rem;
            margin: 10px;
        }
    }
    .show-helpers {
        cursor: pointer;
        padding: 5px 10px;
        font-weight: bold;
        width: 11rem;
        display: flex;
        text-align: left;
        flex-direction: column;
        margin-left: 30px;
        span {
            margin-left: 6px;
        }
        .line {
            display: block;
            background-color: black;
            width: 100%;
            height: 3px;
        }
    }
    .prompts, .vocab {
        background-color: white;
        margin: 30px;
        padding: 20px;
        display: flex;
        justify-content: center; 
        flex-wrap: wrap;
    }
    .game-type {
        text-align: left;
        margin-left: 30px;
        padding: 10px;
    }

</style>
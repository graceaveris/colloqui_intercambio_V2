  
<template>
    <div>
        <!-- Main content -->
        <div class="main-content">
            <h4>{{currentTalkPoint.activeUser.mainContent.targetLang}}</h4>
            <p>{{currentTalkPoint.activeUser.mainContent.translation}}</p>
        </div>

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
</template>

<style lang="scss" scoped> 
    .main-content {
        background-color: white;
        margin: 30px;
        padding: 20px;
        justify-content: center; 

        .session-type {
            color: red;
            align-self: flex-start;
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

</style>

<script>
import Prompt from '@/components/Exchange/ActiveUserDisplay/Prompt'
import Word from '@/components/Exchange/ActiveUserDisplay/Word'
    export default {
        name: 'ActiveUserDisplay', 
        components: { Prompt, Word },
        props: {
            currentTalkPoint: null,
        },
        computed: {
            getPrompts() {

                return this.currentTalkPoint.activeUser.prompts.forEach(prompt => {
                    return prompt.targetLang
                });
            }
        }
    }
</script>
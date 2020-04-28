  
<template>
    <div>
    <!-- if there is active exchange, render exchangeZone component -->
      <div v-if="userProfile.status === 'playing'">
        <ExchangeNav :activeExchange="activeExchange"/>
        <LangDisplay :currentLang="this.activeExchange[this.activeExchange.activeUser]['targetLang']"/>
        <div v-if="isClientsTurn" >
            <ActiveUserDisplay :currentTalkPoint="getCurrentTalkpoint"/>
        </div>
        <div v-else >
            <PassiveUserDisplay :currentTalkPoint="getCurrentTalkpoint"/>
        </div>

        <button @click="terminateExchange" class="button button_large button_decline">Cancel Exchange</button>
        <button @click="changeTurn" class="button button_large button_decline">Next</button>
      </div>

     <!-- NO GAME - EXCHANGE -->
     <div v-else>
         <h5 class="has-p-1">
             Invite a friend via your dashboard to start an exchange
         </h5>
     </div>
    </div>
</template>


<script>
import ExchangeNav from '@/components/Exchange/ExchangeNav/ExchangeNav'
import ActiveUserDisplay from '@/components/Exchange/ActiveUserDisplay/ActiveUserDisplay'
import PassiveUserDisplay from '@/components/Exchange/PassiveUserDisplay/PassiveUserDisplay'
import LangDisplay from '@/components/Exchange/LangDisplay/LangDisplay'
const fb = require('../.../../../firebaseConfig.js')
import { mapState } from 'vuex'
    export default {
        name: 'Exchange', 
        components: { ExchangeNav, PassiveUserDisplay, ActiveUserDisplay, LangDisplay },
        data() {
            return {
                toggleExchange: this.activeExchange.status,
            }
        },
         computed: {
            ...mapState(['userProfile', 'currentUser', 'activeExchange', 'LanguageDisplay']),
            //get the player indicator for the client "user1" or "user2"
            getPlayerNum() {
                if (this.activeExchange.user1.uid === this.currentUser.uid) {
                    return "user1"
                } else {
                    return "user2"
                }
            },
            //checks if the 'turn' belongs to this browser(to render the correct view)
            isClientsTurn() {
                if (this.activeExchange.activeUser === this.getPlayerNum) {
                    return true
                } else {
                    return false
                }
            },
            //calc the round so we can acces the correct item via index
            getTurnRound() {
                return Math.floor(this.activeExchange.turnCount / 2)
            },
            //get current talkpoint based on 
            getCurrentTalkpoint() {
                return this.activeExchange[this.activeExchange.activeUser]['talkPoints'][this.getTurnRound]
            }
        },

        methods: {
            terminateExchange() {
                //save before we update
                let exchangeToDelete = this.userProfile.activeExchange
                //set profiles to free
                fb.db.ref(`/users/${this.activeExchange.user1.uid}`).update({ status: 'free', activeExchange: false })
                .then(
                fb.db.ref(`/users/${this.activeExchange.user2.uid}`).update({ status: 'free', activeExchange: false  })
                ).then(
                 //delete the exchanges
                fb.db.ref(`/exchanges/${exchangeToDelete}`).remove()
                )
            },
            changeTurn() {
                let newTurnCount = this.activeExchange.turnCount + 1
                let newActiveUser = "user1"
                if (this.activeExchange.activeUser === "user1") {
                    newActiveUser = "user2" 
                }
                fb.db.ref(`/exchanges/${this.userProfile.activeExchange}`).update({ turnCount: newTurnCount, activeUser: newActiveUser })
            }
        }
    }
</script>
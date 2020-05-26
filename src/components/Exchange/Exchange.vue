  
<template>
    <div id="exchange">
    <!-- IF ACTIVE EXCHANGE -->

      <div v-if="userProfile.status === 'playing'">
          <h1>TEST{{partnerOnline}}</h1>


        <!-- NAV and TIMER-->
        <div class="exchange-nav">
            <ExchangeNav :activeExchange="this.activeExchange" :currentUser="this.currentUser"/>
            <ExchangeTimer :counter="activeExchange.counter" :isPaused="activeExchange.isPaused"/>
        </div>

        <!-- VIEWS FOR TOPICS -->
        <div class="exchange-view">
            <LangDisplay :currentLang="this.activeExchange[this.activeExchange.activeUser]['targetLang']"/>

            <!-- VIEW RENDER -->
            <div v-if="isClientsTurn" >
                <ActiveUserDisplay :currentTalkPoint="getCurrentTalkpoint"/>
            </div>
            <div v-else >
                <PassiveUserDisplay :currentTalkPoint="getCurrentTalkpoint"/>
            </div>
        </div>

        <!-- CONTROLS -->
            <div class="controls">
                <div class="buttons">
                    <button class="button_cancel" @click="terminateExchange">Cancel Exchange</button>
                    <button @click="changeTurn" class="button button_large button_decline">skip turn</button>
                </div>
            </div>
      </div>

     <!-- NO GAME -->
     <div v-else>
         <h5 class="has-p-1">
             Invite a friend via your dashboard to start an exchange
         </h5>
     </div>
    </div>
</template>

<script>
import ExchangeNav from '@/components/Exchange/ExchangeNav/ExchangeNav'
import ExchangeTimer from '@/components/Exchange/ExchangeTimer/ExchangeTimer'
import ActiveUserDisplay from '@/components/Exchange/ActiveUserDisplay/ActiveUserDisplay'
import PassiveUserDisplay from '@/components/Exchange/PassiveUserDisplay/PassiveUserDisplay'
import LangDisplay from '@/components/Exchange/LangDisplay/LangDisplay'
const fb = require('../.../../../firebaseConfig.js')
import { mapState } from 'vuex'
    export default {
        name: 'Exchange', 
        components: { ExchangeNav, PassiveUserDisplay, ActiveUserDisplay, LangDisplay, ExchangeTimer },
        data() {
            return {
                toggleExchange: this.activeExchange.status,
                inter: null,
            }
        },
        created() {
            //this handles the very first mount  of the timer at 180 seconds.
            //user1's client controls the timer countdown.
            if (( this.activeExchange.user1.uid === this.currentUser.uid ) && (this.activeExchange.counter === 180 )) {
             this.countDown()
            }
        },
        beforeDestroy() {
            //manages edge case where the user clicks back or ends up on ther page via url.
            this.terminateExchange()
        },
        watch: {
                partnerOnline(newValue) {
                    if (newValue === false) {
                     alert(`Your partner has gone offline - exchange over`);
                     this.terminateExchange()
                    }
                }
        },
        computed: {
            ...mapState(['userProfile', 'currentUser', 'activeExchange', 'LanguageDisplay', 'friends']),
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
                let currentTalkPoint = this.activeExchange[this.activeExchange.activeUser]['talkPoints'][this.getTurnRound]
                currentTalkPoint.imageUrl = `https://firebasestorage.googleapis.com/v0/b/vue-boiler-realtime.appspot.com/o/${currentTalkPoint.id}.jpg?alt=media`
                return currentTalkPoint
            },

            //THIS VALUE IS WATCHED
            //we watch this value and trigger game termination if partner is offline for more than 20 seconds
            partnerOnline() {
                if (this.activeExchange.user1.uid === this.currentUser.uid) {
                    //you are user1
                    let partner = this.friends.filter( friend => friend.uid === this.activeExchange.user2.uid)
                    return partner[0].isOnline
                } else {
                    //you are user2
                    let partner = this.friends.filter( friend => friend.uid === this.activeExchange.user1.uid)
                    return partner[0].isOnline
                    
                }
            }
        },

        methods: {
            terminateExchange() {
                clearInterval(this.inter)
                this.inter = null

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
            },

            //methods to handle the timer
            //USER1 CLIENT ONLY!!!
            minusFive() {
                    let newCount = this.activeExchange.counter - 5
                    fb.db.ref(`/exchanges/${this.userProfile.activeExchange}`).update({ counter: newCount })
            },

            countDown() {
                this.inter = setInterval(() => {

                    //here we check if the user is in an active exchange - if so the interval can continue 
                    if (this.userProfile.activeExchange) { //boolean value
                        //check that the counter isnt finished and that the game is not paused (will need to break this into two options)
                        if (this.activeExchange.counter > 0 && this.activeExchange.isPaused === false ) {
                            this.minusFive();
                        } else {
                            clearInterval(this.inter)
                            this.inter = null
                        }

                    //if use is not in an active exchange - we break the interval
                    } else {
                        console.log('INTERVAL CLEARED AS OTHER USER HAS CANCELLED THE GAME')
                        clearInterval(this.inter)
                        this.inter = null
                    }
                    
                }, 5000)
            }
        }
    }
</script>
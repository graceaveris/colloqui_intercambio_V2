  
<template>
<div class="has-p-1">
        <h5>{{exchangeRequest.user1.name}} wants to start an exchange!</h5>
        <button class="button button_med button_accept" @click="startExchange">Accept</button>
        <button class="button button_med button_decline" @click="declineExchange">X</button>
</div>
</template>

<script>
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'ExchangeRequest',
    data() {
        return {
            user1data: null,
            user2data: null,
        }
    },
    props: {
        exchangeRequest: null,
    },
    methods: {
        startExchange() {
            // here we need to fetch the questions for each player
            // based on their level and targetlang
            //need to combine all the varius requests below but for now leave separate as things will change.

            //SAVE USER1 TALKPOINTS TO THE EXCHANGE OBJECT
            fb.db.ref(`/talkPoints/${this.exchangeRequest.user1.targetLang}/${this.exchangeRequest.user1.level}`).once('value').then( res => {
                fb.db.ref(`/exchanges/${this.exchangeRequest.user2.uid}/user1`).update({ talkPoints: res.val()})
            })

            //SAVE USER2 TALKPOINTS TO THE EXCHANGE OBJECT
            fb.db.ref(`/talkPoints/${this.exchangeRequest.user2.targetLang}/${this.exchangeRequest.user2.level}`).once('value').then( res => {
                fb.db.ref(`/exchanges/${this.exchangeRequest.user2.uid}/user2`).update({ talkPoints: res.val()})
            })

            //update the exchange to active
            fb.db.ref(`/exchanges/${this.exchangeRequest.user2.uid}`).update({ status: 'active', turnCount: 0, activeUser: "user1"})

            //update both to isPlaying = true
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user1.uid}`).update({ status: 'playing', activeExchange: this.exchangeRequest.user2.uid }))
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user2.uid}`).update({ status: 'playing', activeExchange: this.exchangeRequest.user2.uid  }))

        },
       declineExchange() {
           //update the exchange to active
            fb.db.ref(`/exchanges/${this.exchangeRequest.user2.uid}`).remove()
            //update both to isPlaying = true
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user1.uid}`).update({ status: 'free', activeExchange: null }))
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user2.uid}`).update({ status: 'free', activeExchange: null  }))
        },
        }
    }

</script>
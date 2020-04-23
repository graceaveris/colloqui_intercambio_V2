  
<template>
<div class="has-p-1">
    <div>
        {{exchangeRequest.user1.name}} wants to start an exchange!
        <button @click="startExchange">Accept</button>
    </div>
</div>
</template>

<script>
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'ExchangeRequest',
    props: {
        exchangeRequest: null,
    },
    methods: {
        startExchange() {
            console.log('exchangeRequest accepted', this.exchangeRequest)
            //update the exchange to active
            fb.db.ref(`/exchanges/${this.exchangeRequest.user2.uid}`).update({ status: 'active' })
            //update both to isPlaying = true
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user1.uid}`).update({ status: 'playing', activeExchange: this.exchangeRequest.user2.uid }))
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user2.uid}`).update({ status: 'playing', activeExchange: this.exchangeRequest.user2.uid  }))
             //push the router view
        }
    }
}
</script>
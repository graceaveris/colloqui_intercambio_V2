  
<template>
<div class="has-p-1">

    <!-- RENDER IF THE USER IS NOT BUSY -->
       <div v-if="userProfile.status === 'free'">
            <h4>Set up exchange</h4>
            <p>Invite a friend to start an exchange</p>

            <div v-for="friend in friends" :key="friend.uid" class="friend-container">
                <div v-if="friend.isOnline" class="friend">
                    <div>{{ friend.name }}</div>
                    <button @click="sendRequest(friend)" class="button button_sml button_request">Send invite</button>
                </div>
            </div>
        </div>
    <!-- RENDER WHEN TEH USER HAS REQUESTED AN EXCHANGE -->
        <div v-if="userProfile.status === 'pending'">
            <h5>Waiting for {{partnerName}} to accept...</h5>
            <button class="button button_med button_decline" @click="cancelRequest()">Cancel</button>
        </div>

</div>
</template>

<style lang="scss" scoped>
.friend-container {
    display: flex;
    width: 60%;
    margin: 30px auto;
}
    .friend {
        align-items: center;
        display: flex;
        padding: 10px;
        button {
            margin-left: 10px;
        }
    }
</style>

<script>
import { mapState } from 'vuex'
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'RequestExchange',
    data() {
        return {
            partnerName: null,
            partnerUID: null,
            requestUID: null,
            exchange: null,
        }
    },
    props: {
        friends: null,
    },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friends', 'exchangeRequests']),
    },
    methods: {
        sendRequest(friend) {
            //set data required in the request for each user
            //in future here we will add all the details for the 
            let user1 = {}
            user1.name = this.userProfile.name
            user1.uid = this.currentUser.uid
            user1.targetLang = this.userProfile.targetLang
            user1.level = this.userProfile.level
            let user2 = {}
            user2.name = friend.name
            user2.uid = friend.uid
            user2.targetLang = friend.targetLang
            user2.level = friend.level

            fb.db.ref(`/exchanges/${friend.uid}`).set({ user1, user2, status: 'pending' }).then(

            //set the exchange in the data and listen for changes. If it changes, we update our data object with the latest version of the exchange! When it becomes active the router will send us to the exchange view.
            fb.db.ref(`/exchanges/${friend.uid}`).on('value', snap => this.exchange = snap.val()))

            //then we set both users to busy until the exchange is accepted or cancelled.
            .then(fb.db.ref(`/users/${this.currentUser.uid}`).update({ status: 'pending' }))
            .then(fb.db.ref(`/users/${friend.uid}`).update({ status: 'pending' }))

            //then we set a few data variables for future and render use.
            this.status = 'pending'
            this.partnerName = friend.name
            this.partnerUID = friend.uid
        },

        cancelRequest() {
            //we update the users so they are no longer busy, and available for other exchanges.
            console.log('cancel request', this.currentUser.uid)
            fb.db.ref(`/users/${this.currentUser.uid}`).update({ status: 'free' })
            .then(
            fb.db.ref(`/users/${this.partnerUID}`).update({ status: 'free' })
            )
            .then(
            fb.db.ref(`/exchanges/${this.partnerUID}`).remove()
            )
            
            //then we clear our data!
            this.status = null
            this.partnerName = null
            this.partnerUID = null
            this.exchange = null
        }
    }
}
</script>
  
<template>
<div class="has-p-1">


    <!-- if the user has an invite -->
    <div v-if="exchangeRequests">
        you have an invite
    </div>

    <!-- if has no friends -->
        <div v-if="this.friends === false" class="has-p-1">  
              <h5>welcome to colloqui!</h5>
              <p>Add your langugae exchange partners as friends to get started.</p>
        </div>

    <!-- has friends but none are online -->
        <div v-else-if="this.friends.length > 1 && this.hasFriendsOnline === false" class="has-p-1">
            <h5>None of your friends are online</h5>
            <p>You can set up an exchange once one of your friends logs in.</p>
        </div>

    <!-- RENDER IF THE USER IS NOT BUSY -->
        <div v-else-if="userProfile.status === 'free' && this.hasFriendsOnline">
            <p>free for exchange</p>
        </div>

</div>
</template>

<style lang="scss" scoped>
</style>

<script>
import { mapState } from 'vuex'
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'StatusBlock',
    props: {
        friends: null,
    },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friends', 'exchangeRequests']),

        hasFriendsOnline() {
            let status = false
            this.friends.forEach( friend => {
                if (friend.isOnline) {
                    status = true
                }
            })
            return status
        },

        getStatus() {
        return this.userProfile.status
        }
    },
    methods: {
        returnToExchange() {
            this.$router.push('/exchange')
        },
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
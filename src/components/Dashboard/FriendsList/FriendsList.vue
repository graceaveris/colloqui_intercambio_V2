  
<template>
<div class="has-p-1">

    <!-- RENDER IF USER HAS FRIENDS -->
    <div v-if="this.friends.length > 0">

        <!-- RENDER IF THE USER IS NOT BUSY -->
       <div v-if="userProfile.status === 'free'">
           <h4>Your Tandem Partners</h4>
            
            <!-- Online -->
            <div class="friends-list__subheader">Online</div>
            <div v-if="this.getOnlineFriends.length > 0">
                <div v-for="friend in getOnlineFriends" :key="friend.uid" class="friends-list__container">
                    <Friend :friend="friend" class="has-pb-slight"/>
                    <button v-if="friend.status === 'free'" @click="sendRequest(friend)" class="button button_light button_request">Send Exchange Invite</button>
                </div>
            </div>
            <div v-else class="friends-list__no-friends">
                No one is online
            </div>

            <!-- Offline -->
            <div class="friends-list__subheader">Offline</div>
            <div v-if="this.getOfflineFriends.length > 0">
                <div v-for="friend in getOfflineFriends" :key="friend.name" class="friends-list__container">
                    <Friend :friend="friend" class="has-pb-slight"/>
                </div>
            </div>
            <div v-else class="friends-list__no-friends">
               All your friends are online
            </div>
        </div>


    <!-- RENDER IF THE USER IS IN AN ACTIVE EXCHANGE -->
        <div v-if="this.userProfile.status === 'playing'">
            <p>You are in an active exchange</p> 
            <button @click="returnToExchange" class="button button_med button_accept" >return to exchange</button>
        </div>
    <!-- RENDER WHEN TEH USER HAS REQUESTED AN EXCHANGE -->
        <div v-else-if="this.exchange && this.userProfile.status === 'pending'" class="has-p-1">
            <p>Exchange invite sent...</p>
            <h5>Waiting for {{partnerName}} to accept</h5>
            <button class="button button_med button_decline" @click="cancelRequest()">Cancel</button>
        </div>
    <!-- IF THE USER HAS AN EXCHANGE REQUEST-->
        <div v-else-if="this.exchangeRequests && this.userProfile.status === 'pending' ">
            <ExchangeRequest :exchangeRequest="this.exchangeRequests"/>
        </div>
    
    </div>
    <!-- RENDER IF NO FRIENDS -->
    <div v-else class="no-friends">
        <h4>Welcome to Colloqui!</h4>
        <p>Add exchange partners by email to get started.</p>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .friends-list {

        &__subheader {
            padding: 20px 10px 15px 10px;
            font-weight: 600;
        }

        &__container {
            display: flex;
            align-items: center;
        }

        &__no-friends {
            font-size: .8rem;
            padding-left: 10px;
        }

    }
</style>

<script>
import Friend from '@/components/Dashboard/FriendsList/Friend/Friend'
import ExchangeRequest from '@/components/Dashboard/ExchangeRequest/ExchangeRequest'
import { mapState } from 'vuex'
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'FriendsList',
    components: { Friend, ExchangeRequest  },
    props: {
        friends: null,
    },
    data() {
        return {
            partnerName: null,
            partnerUID: null,
            requestUID: null,
            exchange: null,
        }
    },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'exchangeRequests']),
        getOnlineFriends() {
            return this.friends.filter( friend => friend.isOnline )
        },
        getOfflineFriends() {
            return this.friends.filter( friend => !friend.isOnline )
        },

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

            fb.db.ref(`/exchanges/${friend.uid}`).set({ user1, user2, status: 'pending', counter: 180, isPaused: false }).then(

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
        },
        returnToExchange() {
            this.$router.push('/exchange')
        },
        hasFriendsOnline() {
            let status = false
            this.friends.forEach( friend => {
                if (friend.isOnline) {
                    status = true
                }
            })
            return status
        },
    }
}
</script>



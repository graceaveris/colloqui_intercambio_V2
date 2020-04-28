<template>
  <div>
  <section id="dashboard">

      <div class="welcome">
         <UserProfile :userProfile="this.userProfile" :currentUser="this.currentUser"/>
      </div>

      <div class="dash-container">
        <div class="social has-p-1">
           <FriendsList :friends="this.friends" class="has-p-1"/>
           <FriendRequests :friendRequests="this.friendRequests"/>
            <AddFriend :userProfile="this.userProfile" :currentUser="this.currentUser" :friendRequests="this.friendRequests" />
        </div>

        <div class="exchange has-p-1">
          <div v-if="this.friends.length > 0 && this.hasFriendsOnline">  
            <div>
                <!-- Wil be prompted to return to game if **isPlaying** -->
                <div v-if="userProfile.status === 'playing'" class="has-p-1">
                    <p>You are in an active exchange</p> 
                    <button @click="returnToExchange" class="button button_med button_accept" >return to exchange</button>
                </div>
                <!-- if not currently in game -->
                <div v-else>
                <!-- IF *PENDING** CHECKS IF USER HAS BEEN SENT A REQUEST AND RENDERS -->
                    <div v-if="exchangeRequests">
                        <ExchangeRequest :exchangeRequest="this.exchangeRequests"/>
                    </div>
                    <!-- CAN REQUEST EXCHANGE IF **NOT BUSY** -->
                    <div v-else>
                        <RequestExchange :friends="this.friends" />
                    </div>
                </div>

            </div>
          </div>

          <div v-else-if="this.friends.length > 1 && this.hasFriendsOnline === false" class="has-p-1">
              <h5>None of your friends are online</h5>
              <p>You can set up an exchange once one of your friends logs in.</p>
          </div>

          <div v-else class="has-p-1">  
              <h5>welcome to colloqui!</h5>
              <p>Add your langugae exchange partners as friends to get started.</p>
          </div>
       </div>
    </div>

  </section>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import UserProfile from '@/components/Dashboard/UserProfile/UserProfile'
import AddFriend from '@/components/Dashboard/AddFriend/AddFriend'
import FriendsList from '@/components/Dashboard/FriendsList/FriendsList'
import FriendRequests from '@/components/Dashboard/FriendRequests/FriendRequests'
import RequestExchange from '@/components/Dashboard/RequestExchange/RequestExchange'
import ExchangeRequest from '@/components/Dashboard/ExchangeRequest/ExchangeRequest'
export default {
    components: { AddFriend, FriendRequests, FriendsList, UserProfile, RequestExchange, ExchangeRequest },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friendRequests', 'friends', 'exchangeRequests', 'activeExchange']),

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
    watch: {
        getStatus(newStatus) {
            if (newStatus === 'playing') {
                this.$router.push('/exchange')
            }
        }
    },
    methods: {
        returnToExchange() {
            this.$router.push('/exchange')
        }
        
    }
}
</script>
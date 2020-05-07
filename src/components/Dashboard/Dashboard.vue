<template>
  <div>
  <section id="dashboard">

    <div class="welcome">
        <UserProfile :userProfile="this.userProfile" :currentUser="this.currentUser"/>
    </div>

    <div class="dash-container">
        <div class="friends-list has-p-1">
             <FriendsList :friends="this.friends" class="has-p-1"/>
        </div>

        <div class="friend-requests">
            <FriendRequests :friendRequests="this.friendRequests" class="has-p-1 friend-requests__requests"/>
            <AddFriend :userProfile="this.userProfile" :currentUser="this.currentUser" :friendRequests="this.friendRequests" class="has-p-1 friend-requests__add-friend"/>
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
export default {
    components: { AddFriend, FriendRequests, FriendsList, UserProfile },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friendRequests', 'friends', 'exchangeRequests', 'activeExchange']),


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
}
</script>
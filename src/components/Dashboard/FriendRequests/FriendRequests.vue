  
<template>
<div class="has-p-1">
    
    <h4 class="header">Partner Requests</h4>

    <div class="subheader">Pending Requests</div>
    <!-- //invites -->
    <div v-if="friendRequests">
        <div v-for="request in this.friendRequests" :key="request.uid">
            <FriendRequest :request="request" />
        </div>
    </div>
    <div v-else>
        <p class="request-status">No pending invites</p>
    </div>

    <!-- //pending invites-->
    <div v-if="pendingFriendRequests" class="pending-requests">
        <div class="subheader">Sent Requests</div>
        <div v-for="request in this.pendingFriendRequests" :key="request.uid">
            <div class="request-status">Waiting for <span>{{request.recieverName}}</span> to accept</div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .pending-requests {
        padding-bottom: 10px;
    }
    .request-status {
        font-size: .8rem;
        padding-left: 10px;
        padding-bottom: 8px;

        span {
        font-weight: 600;
        }
    }
    .subheader {
        padding: 15px 15px 15px 10px;
        font-weight: 600;
    }
    .header {
        padding: 10px;
    }
</style>

<script>
import FriendRequest from '@/components/Dashboard/FriendRequests/FriendRequest/FriendRequest'
export default {
    name: 'FriendRequests',
    components: { FriendRequest },
    props: {
        friendRequests: null,
        pendingFriendRequests: null,
    },
}
</script>
  
<template>
<div class="has-p-1">
    <h5>Partner Requests</h5>
    <div v-if="friendRequests">
        <div v-for="request in getRequests" :key="request.uid">
            <FriendRequest :request="request" />
        </div>
    </div>
    <div v-else>
        <p class="label">No pending requests</p>
    </div>
</div>
</template>

<script>
import FriendRequest from '@/components/Dashboard/FriendRequests/FriendRequest/FriendRequest'
export default {
    name: 'FriendRequests',
    components: { FriendRequest },
    props: {
        friendRequests: null,
    },
    computed: {
        getRequests() {
            return JSON.parse(JSON.stringify(this.friendRequests));
        },
    },
}
</script>
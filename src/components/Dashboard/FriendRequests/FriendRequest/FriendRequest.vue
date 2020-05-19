  
<template>
<div>
    <div class="friend-request">
       <div>{{request.senderName}}</div>
       <button class="button button_light button_accept" @click="acceptFriend">Accept ✓</button>
    </div>
</div>
</template>

<style lang="scss" scoped>

.friend-request {
    display: flex;
    align-items: center;
	padding: 8px 10px;
    button {
        margin-left: 10px;
    }
}

</style>
 
<script>
import { mapState } from 'vuex'
const fb = require('../../../../firebaseConfig.js')
export default {
    name: 'FriendRequest',
    props: {
        request: null,
    },
    computed: {
        ...mapState(['userProfile', 'currentUser']),
    },

    methods: {
        acceptFriend() {
         //save id to the user object
        fb.db.ref(`/users/${this.currentUser.uid}/friends/${this.request.senderUID}`).set( true )
        .then(   //save id to the user object
        fb.db.ref(`/users/${this.request.senderUID}/friends/${this.currentUser.uid}`).set( true )
        )
        //then we delete the request
        .then(
        fb.db.ref(`/requests/${this.request.requestUID}`).remove()
        )
        //if something doesnt work we catch the error
        .catch(err => {
          console.log('fail:', err)
        })
     }  
  }
}
</script>
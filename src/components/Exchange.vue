  
<template>
    <div>
      <div>
        {{activeExchange}}
     </div>
     <button @click="terminateExchange">Cancel Exchange</button>
    </div>
</template>

<script>
const fb = require('../.../../firebaseConfig.js')
import { mapState } from 'vuex'
    export default {
        name: 'Exchange', 
        data() {
            return {
                exchange: null,
            }
          },
         computed: {
            ...mapState(['userProfile', 'currentUser', 'activeExchange']),
        },
        methods: {
            terminateExchange() {
                //set profiles to free
                fb.db.ref(`/users/${this.activeExchange.user1.uid}`).update({ status: 'free', activeExchange: false })
                .then(
                fb.db.ref(`/users/${this.activeExchange.user2.uid}`).update({ status: 'free', activeExchange: false  })
                ).then(
                 //delete the exchange
                fb.db.ref(`/exchanges/${this.userProfile.activeExchange}`).remove()
                )
            }
        }
    }
</script>
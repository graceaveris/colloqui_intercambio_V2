import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')
Vue.use(Vuex)


// handle page reload (reoading the page is going to empty our store. This resets the data in this instance!
fb.auth.onAuthStateChanged(user => {
  if (user) {
    console.log('usertest', user)
      store.commit('setCurrentUser', user)
      store.dispatch('fetchUserProfile')
      store.dispatch('fetchFriends', user.uid)
      store.dispatch('fetchFriendRequests', user.uid )
      store.dispatch('fetchExchangeRequests', user.uid )
      store.dispatch('fetchActiveExchange', user.uid)
      // REALTIME //keep an eye on database for changes in your profile and updates
      const dbObjectRef = fb.db.ref().child(`/users/${user.uid}`)
      dbObjectRef.on('value', snap => store.commit('setUserProfile', snap.val()))
      // PRESENCE - online status
      var amOnline = fb.db.ref(".info/connected");
         amOnline.on('value', function(snapshot) {
            if (snapshot.val()) {
           // User is online.
           fb.db.ref(`users/${user.uid}`).update({ isOnline: true })
           fb.db.ref(`users/${user.uid}`).onDisconnect().update({ isOnline: false });
           // User logging out is handled by logout function
           }
      });
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    friendRequests: {},
    friends: {},
    exchangeRequests: {},
    activeExchange: {},
  },
  
  mutations: {
      setCurrentUser(state, val) {
      state.currentUser = val
    },
      setUserProfile(state, val) {
      state.userProfile = val
    },
      setFriendRequests(state, val) {
      state.friendRequests = val
    },
      setFriends(state, val) {
      state.friends = val
    },
      setExchangeRequests(state, val) {
        console.log('in setExchangeReq mutation', val)
      state.exchangeRequests = val
    },
     setActiveExchange(state, val) {
      state.activeExchange = val
    }
  },

  actions: {
    //set the user to offline on logout
    goOffline({ state }) {
      fb.db.ref(`/users/${state.currentUser.uid}`).update({ isOnline: false })
    },

    // clear data on logout
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
  },
    // we use 'once' to fetch simple data thats not going to change - re user profile
    fetchUserProfile({ commit, state }) {
      fb.db.ref(`/users/${state.currentUser.uid}`).once('value').then(res => {
          commit('setUserProfile', res.val())
      }).catch(err => {
        console.log(err)
      })
    },

    fetchFriendRequests({ commit }, data) {
      // REALTIME // get friend requests where the ID beongs to the current user
      let requestsRef = fb.db.ref('requests');
        requestsRef.orderByChild('recieverUID').equalTo(data).on('value', snap => {
          commit('setFriendRequests', snap.val())
        })
    },

    fetchExchangeRequests({ commit }, uid) {
      let exchangeRef = fb.db.ref(`exchanges/${uid}`);
        exchangeRef.on('value', snap => {
          commit('setExchangeRequests', snap.val())
        })
    },

    fetchActiveExchange({ commit }, uid) {
      let exchangeRef = fb.db.ref('exchanges');
      exchangeRef.on('value', snap => {
        //get our data
        let data = snap.val()
        let dataKeys = Object.keys(data)
        
        dataKeys.forEach( key => {
          //if the key is the same as the game uid
          let user1 = data[key].user1.uid
          let user2 = data[key].user2.uid
          if ( user1 === uid || user2 === uid) {
            commit('setActiveExchange', data[key])
          }
        })
      })
    },

    fetchFriends({ commit }, uid) {

      // REALTIME // get the friends object for the current user
      let userList = fb.db.ref('users');
      userList.on('value', snap => {
        let friendList = []
        let data = snap.val()

        let userUIDS = Object.keys(data)
        //then we check the data to see if friends object includes the user
        userUIDS.map( id => {
          let userFriends
          userFriends = data[id].friends
          let userFriendsKeys = Object.keys({...userFriends})

          userFriendsKeys.forEach( friend => {
            if (friend === uid) {
              let friendObj = {}
              friendObj.uid = id
              friendObj.name = data[id]['name']
              friendObj.isOnline = data[id].isOnline
              friendObj.status = data[id]['status']
              friendObj.email = data[id]['email']
              friendObj.targetLang = data[id]['targetLang']
              friendObj.level = data[id]['level']
              if (friendObj.isOnline) {
                friendList.unshift(friendObj)
              } else {
                friendList.push(friendObj)
              }
            }
          })
        })
        commit('setFriends', friendList)
      })
    },
  },
  
  modules: {
  }
})



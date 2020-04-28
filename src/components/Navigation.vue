  
<template>
    <header>
        <section>
            <div class="nav">
                <div class="logo">
                    <router-link to="dashboard"><h3>Colloqui</h3></router-link>
                </div>
                <div class="links">
                    <ul class="inline">
                        <li><router-link to="dashboard">Dashboard</router-link></li>
                        <li><router-link to="settings">Settings</router-link></li>
                        <li><a @click="logout">logout</a></li>
                    </ul>
                </div>
            </div>
        </section>
    </header>
</template>

<style lang="scss" scoped>

.nav {
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>

<script>
    const fb = require('../firebaseConfig.js')
    export default {
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('goOffline')
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
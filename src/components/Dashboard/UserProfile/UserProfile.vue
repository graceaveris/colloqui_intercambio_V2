  
<template>
<div>
    <div class="profile-container">
        <div class="dash-image">
            <img v-if="userProfile.targetLang ==='spanish'" src="../../../assets/images/spanish-head-2.png" />
            <img v-else src="../../../assets/images/english-head-2.png" />
        </div>
        <div class="dash-text">
            <h2>Hey there, {{userProfile.name}}</h2>
            <p>You're speaking {{userProfile.targetLang}} at a {{userProfile.level}} level</p>
        </div>
    </div>

</div>
</template>
<style lang="scss" scoped>
    .profile-container {
        display: flex;
        margin-top: 15px;
        justify-items: center;
    }

    .dash-image {
        padding-right: 10px;
        width: 13rem;
        height: 100%;
        margin-bottom: -20px;
    }

    .dash-text {
        display: flex;
        padding-left: 2rem;
        flex-direction: column;
        justify-content: center;
    }
</style>

<script>
export default {
    name: 'UserProfile',
    props: {
        userProfile: null,
    },
}

</script>



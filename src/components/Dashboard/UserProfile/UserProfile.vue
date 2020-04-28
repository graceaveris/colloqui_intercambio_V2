  
<template>
<div>
    <h2>Welcome {{userProfile.name}}</h2>
    <div class="profile-container">
        <div class="icon">
            <img v-if="userProfile.targetLang ==='spanish'" src="../../../assets/images/spain.png" />
            <img v-else src="../../../assets/images/united-kingdom.png" />
        </div>
        <p>You're learning {{userProfile.targetLang}} at a {{userProfile.level}} level</p>
    </div>

</div>
</template>
<style lang="scss" scoped>
    .profile-container {
        display: flex;
        margin-top: 15px;
    }

    .icon {
        padding-right: 10px;
        width: 38px;
        height: 38px;
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



  
<template>
    <div>
        <div>
            <div class="users-container">
            <!-- CURRENT PLAYER IN TOP POSITION -->
                <div v-if="currentUser.uid === activeExchange.user1.uid" class="user">
                    <div class="icon">
                        <img v-if="activeExchange.user1.targetLang ==='spanish'" src="../../../assets/images/spain.png" />
                        <img v-else src="../../../assets/images/united-kingdom.png" />
                    </div>
                    <div>
                        <div class="user--name">{{activeExchange.user1.name}} <span>( you )</span></div>
                        <div class="user--level">{{activeExchange.user1.level}} {{activeExchange.user1.targetLang}}</div>
                    </div>
                </div>

                <div v-else class="user">
                    <div class="icon">
                        <img v-if="activeExchange.user2.targetLang ==='spanish'" src="../../../assets/images/spain.png" />
                        <img v-else src="../../../assets/images/united-kingdom.png" />
                    </div>
                    <div>
                        <div class="user--name">{{activeExchange.user2.name}} <span>(you)</span></div>
                        <div class="user--level">{{activeExchange.user2.level}} {{activeExchange.user2.targetLang}}</div>
                    </div>
                </div>

            <!-- SECONDARY PLAYER-->
                <div v-if="currentUser.uid !== activeExchange.user1.uid" class="user">
                    <div class="icon">
                        <img v-if="activeExchange.user1.targetLang ==='spanish'" src="../../../assets/images/spain.png" />
                        <img v-else src="../../../assets/images/united-kingdom.png" />
                    </div>
                    <div>
                        <div class="user--name">{{activeExchange.user1.name}}</div>
                        <div class="user--level">{{activeExchange.user1.level}} {{activeExchange.user1.targetLang}}</div>
                     </div>
                </div>

                <div v-else class="user">
                    <div class="icon">
                        <img v-if="activeExchange.user2.targetLang ==='spanish'" src="../../../assets/images/spain.png" />
                        <img v-else src="../../../assets/images/united-kingdom.png" />
                    </div>
                    <div>
                        <div class="user--name">{{activeExchange.user2.name}}</div>
                        <div class="user--level">{{activeExchange.user2.level}} {{activeExchange.user2.targetLang}}</div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped> 

    h4 {
        padding-bottom: 0px;
    }

    .users-container {
        display: flex;
        flex-direction: column;
    }

    .user {
        display: flex;
        text-align: left;
        align-items: center;

        span {
            padding-left: 5px;
        }

        .icon {
            margin: 10px;
            width: 2.1rem;
        }

        &--name {
            font-size: .8rem;
            font-weight: 600;
            padding-bottom: 3px;
        }
        &--level {
            font-size: .8rem;
        }

    }
</style>

<script>
    export default {
        name: 'ExchangeNav', 
        props: {
            activeExchange: null,
            currentUser: null,
        }

    }
</script>
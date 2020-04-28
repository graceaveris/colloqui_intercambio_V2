  
<template>
    <div>
        <div class="exchange-nav">
            <div class="user user_1">
                <div class="icon">
                     <img v-if="activeExchange.user1.targetLang ==='spanish'" src="../../../assets/images/spain.png" />
                    <img v-else src="../../../assets/images/united-kingdom.png" />
                </div>
                <div>
                    <h4>{{activeExchange.user1.name}}</h4>
                    <p>{{activeExchange.user1.level}} {{activeExchange.user1.targetLang}}</p>
                </div>
            </div>

            <div class="user user_2">
                <div>
                    <h4>{{activeExchange.user2.name}}</h4>
                    <p>{{activeExchange.user2.level}} {{activeExchange.user2.targetLang}}</p>
                </div>
                <div class="icon">
                     <img v-if="activeExchange.user2.targetLang ==='spanish'" src="../../../assets/images/spain.png" />
                    <img v-else src="../../../assets/images/united-kingdom.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped> 

    h4 {
        padding-bottom: 0px;
    }
    .exchange-nav {
        display: flex;
        width: 100%;
        background-color: white;
    }

    .user {
        display: flex;
        padding: 15px;
        width: 50%;

        .icon {
            margin: 10px;
            width: 2.8rem;
        }

        &_1 {
            justify-content: flex-start;
            text-align: left;

        }

        &_2 {
            justify-content: flex-end;
            text-align: right;
        }
    }
</style>

<script>
    export default {
        name: 'ExchangeNav', 
        props: {
            activeExchange: null,
        }

    }
</script>
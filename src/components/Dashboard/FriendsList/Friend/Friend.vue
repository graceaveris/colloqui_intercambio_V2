  
<template>
<div>
    <!-- if online -->
    <div v-if="friend.isOnline" class="friend">
        <div class="icon">
            <img v-if="friend.targetLang ==='spanish'" src="../../../../assets/images/spain.png" />
            <img v-else src="../../../../assets/images/united-kingdom.png" />
        </div>
        <div v-if="friend.status === 'free'" class="online-indicator free" ></div>
        <div v-else class="online-indicator busy" ></div>
        <div class="friend__details">
            <div>
                <div class="friend__details--name">{{friend.name}}
                    <span v-if="friend.status === 'free'">- online</span>
                    <span v-else>- busy</span>
                </div>
            </div>
            <div class="friend__details--level">{{friend.level}} {{friend.targetLang}} speaker</div>
        </div>
    </div>

    <!-- if offline -->
    <div v-if="!friend.isOnline" class="friend">
        <div class="icon">
            <img v-if="friend.targetLang ==='spanish'" src="../../../../assets/images/spain.png" />
            <img v-else src="../../../../assets/images/united-kingdom.png" />
        </div>
        <div class="friend__details">
            <div class="friend__details--name">{{friend.name}} <span> - {{friend.level}} {{friend.targetLang}} speaker</span></div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>

    .friend {
        display: flex;
        align-items: center;
        padding: 3px 10px;

        &__details {
            padding-left: 10px;

            &--name {
                font-size: 1.2rem;
            }
            &--level {
                font-size: .8rem;
                margin-top: 3px;
            }

            span {
                font-size: .8rem;
                margin-left: 5px;
            }
        }

        .icon {
            width: 2.2rem;
            height: 2.2rem;
            z-index: 100;
        }

        .online-indicator {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 50%;
            margin-left: -12px;
        }

        .free {
            background-color: rgb(92, 240, 183);
        }

        .busy {
            background-color: rgb(226, 193, 62);
        }
    }
</style>


<script>
export default {
    name: 'Friend',
    props: {
        friend: null,
    }
}
</script>
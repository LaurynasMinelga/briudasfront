<template>
    <b-container>
        <br>
        <b-row>
            <b-col align-self="center" cols="4" offset="0" offset-lg="1" class="plugin-roles">
                <router-link :to="{ path: '/channels' }">
                <b-row>
                    <div class="plugin-left">
                        <img class="plugin-img" src="img/icons/browser/contract.svg">
                    </div>
                    <div class="plugin-right">
                        <div class="plugin-name">
                            Role-bot
                        </div>
                        <div class="plugin-text">
                            <p>Make changes to messages with role-reactions</p>
                        </div>
                    </div>
                </b-row>   
                </router-link> 
            </b-col>
            <b-col align-self="center" cols="4" offset="0" offset-lg="1" class="plugin-roles">
                <router-link :to="{ path: '/channels' }">
                <b-row>
                    <div class="plugin-left">
                        <img class="plugin-img" src="img/icons/browser/question.svg">
                    </div>
                    <div class="plugin-right">
                        <div class="plugin-name">
                            Twitch-bot
                        </div>
                        <div class="plugin-text">
                            <p>Make changes to messages with role-reactions</p>
                        </div>
                    </div>
                </b-row>
                </router-link>
            </b-col>
        </b-row>

        <b-row>
            <b-col align-self="center" cols="4" offset="0" offset-lg="1" class="plugin-roles">
                <b-row>
                    <div class="plugin-left">
                        <img class="plugin-img" src="img/icons/browser/question.svg">
                    </div>
                    <div class="plugin-right">
                        <div class="plugin-name">
                            Youtube-bot
                        </div>
                        <div class="plugin-text">
                            <p>Make changes to messages with role-reactions</p>
                        </div>
                    </div>
                </b-row>
                
            </b-col>
            <b-col align-self="center" cols="4" offset="0" offset-lg="1" class="plugin-roles">
                <b-row>
                    <div class="plugin-left">
                        <img class="plugin-img" src="/icons/browser/question.svg">
                    </div>
                    <div class="plugin-right">
                        <div class="plugin-name">
                            Some..thing-bot
                        </div>
                        <div class="plugin-text">
                            <p>Make changes to messages with role-reactions</p>
                        </div>
                    </div>
                </b-row>
                
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'managercontent'
}
</script>

<style scoped>
.plugin-roles{
    cursor: pointer;
    min-width: 350px;
    margin-right: 50px;
    margin-bottom: 32px;
    min-height: 120px;
    padding: 15px 30px 0px 20px;
    background-color: #2b2f33;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
}

.plugin-left{
    width: 60px;
    height: 80px;
}

.plugin-img{
    min-height: 75px;
    min-width: 55px;
}

.plugin-right{
    max-width: 270px;
}

.plugin-name{
    color: #fff;
    text-align: left;
    padding-left: 20px;
    font-size: 20px;
    line-height: 1;
    font-weight: 600;
}

.plugin-text p{
    font-size: 16px;
    text-align: left;
    color: rgba(255,255,255,.62);
    margin-top: 10px;
    padding-left: 20px;
    line-height: 1.4;
}

a:hover{
    color: transparent;
    text-decoration: none;
}
</style>
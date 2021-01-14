<template>
<div>
    <b-row>
        <b-col lg="3"/>
        <b-col lg="6">
            <ProfileCardComponent :profile="profile"/>
            <TwitchCardComponent v-if="profile.settings.twitch.panel" :user="user"/>
        </b-col>
        <b-col lg="3"/>
    </b-row>
    <b-col v-if="profile.apps !== ''" cols="12" lg="9">
        <div v-for="modul in profile.apps" :key="modul">
            <module 
                v-if="modul !== ''" 
                :modul="modul"
            ></module>
        </div>
    </b-col>
</div>
</template>

<script>
import axios from 'axios';
import AboutCard from '@/views/user/components/profile/AboutCard.vue'
import Card from '@/views/user/components/profile/ProfileCardOld.vue'
import ProfileCardComponent from '@/views/user/components/profile/ProfileCard.vue'
import TwitchCardComponent from '@/views/user/components/profile/TwitchCard.vue'
const { API_URL } = require("@/constants");
var USER_URL = API_URL+'/users/';
export default {
    data() {
        return {
            user: {
                discord: {
                    id: '',
                },
                twitch: {
                    id: '',
                }
            },
            profile: {
                settings: {
                    twitch: {
                        panel: false,
                    },
                    discord: {
                        panel: false,
                    }
                },
                image: null,
                about: null,
                birthday: null,
                city: null,
                name: null,
                nickname: null,
                surname: null,
            },
        }
    },
    components: {
        ProfileCardComponent,
        TwitchCardComponent,
        AboutCard,
        Card
    },
    methods:{
        getUser(){

            axios({
                method: 'get',
                url: API_URL+'/users/'+this.$route.params.id
            })
            .then(response =>{
                if (response.status === 200){
                    this.user = response.data.data;
                } 
            })
            .catch(error=>{
                //console.log(error);
            });

            axios({
                method: 'get',
                url: API_URL+'/profiles/'+this.$route.params.id,
            })
            .then(response =>{
                if (response.status === 200){
                    this.profile = response.data.data;
                    if (response.data.data.birthday) {
                        this.profile.birthday = response.data.data.birthday.slice(0,10);
                    } 
                } 
            })
            .catch(error=>{
                //console.log(error);
            });
        },
    },
    mounted(){
        this.getUser();
    }
}
</script>

<style>
</style>

<template>
    <div class="profile-card-body">


        <button v-b-toggle.collapse-twitch type="button" class="social-button social-button-about" id="toggle-twitch">
            <span>Show more...</span>
        </button>

        <b-collapse id="collapse-twitch">
            <div>
                s
            </div>
        </b-collapse>
    </div>
</template>

<script>
import axios from 'axios'
import { TWITCH_URL_PLAIN } from '@/constants.js'
import {twitch_clientid} from '@/constants.js'
export default {
    props: {
        user: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data(){
        return {
            twitch: {
                user: {
                    display_name: '',
                },
                followers: {
                    total: '',
                    data: [],
                },
                videos: []
            }
        }
    },
    methods: {
        getTwitchUserFollowers(){
            return axios({
                method: 'get',
                url: TWITCH_URL_PLAIN+'/users/follows?to_id='+this.user.twitch.id,
                headers: {
                    'Client-ID': twitch_clientid,
                }
            })
            .then(response =>{
                if (response.status === 200){
                    this.twitch.user.display_name = response.data.data[0].to_name;
                    this.twitch.followers = response.data;
                } 
            })
            .catch(error=>{
                //console.log(error);
            });
        },
        getTwitchVideos(){
            return axios({
                method: 'get',
                url: TWITCH_URL_PLAIN+'/users/videos?user_id='+this.user.twitch.id,
                headers: {
                    'Client-ID': twitch_clientid,
                }
            })
            .then(response =>{
                if (response.status === 200){
                    this.twitch.user.display_name = response.data.data[0].to_name;
                    this.twitch.followers = response.data;
                } 
            })
            .catch(error=>{
                //console.log(error);
            });
        },

    },
    mounted(){
        this.getTwitchUserFollowers();
    }
    
}
</script>

<style scoped>

.profile-card-body {
    background-color: #2b2f33 !important;
}
</style>
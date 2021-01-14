<template>
    <div>
        <b-row>
            <b-col lg="3"/>
            <b-col lg="6">
                <div v-if="message" class="alert alert-dark" role="alert">{{message}}</div>
                <div v-if="error" class="alert alert-dark" role="alert">{{error}}</div>
                <button v-b-toggle.collapse-twitch type="button" class="social-button" id="toggle-twitch">
                    <img class="social-img" src="@/assets/browser/arrow_down.png" alt="arrow_down">
                    <span>Twitch settings</span>
                </button>
                <b-collapse id="collapse-twitch">
                    <b-card class="settings-card" body-class="text-left">
                        <b-form-checkbox size="lg" v-model="twitch.sharing" name="check-button" switch>
                            Stream announcements
                            <b-button id="popover-twitch-stream-announcements">i</b-button>
                        </b-form-checkbox>
                        <b-form-checkbox size="lg" v-model="twitch.panel" name="check-button" switch>
                            Twitch panel 
                            <b-button id="popover-twitch-panel">i</b-button>
                        </b-form-checkbox>
                        <div style="float: right">
                            <b-button type="button" class="submit-input" v-on:click="twitchSave">Save</b-button>
                        </div> 
                    </b-card>
                </b-collapse>

                <button v-b-toggle.collapse-discord type="button" class="social-button" id="toggle-discord">
                    <img class="social-img" src="@/assets/browser/arrow_down.png" alt="arrow_down">
                    <span>Discord settings</span>
                </button>
                <b-collapse id="collapse-discord">
                    <b-card class="settings-card" body-class="text-left">
                        <b-form-checkbox size="lg" v-model="discord.panel" name="check-button" switch>
                            Discord panel 
                            <b-button id="popover-discord-panel">i</b-button>
                        </b-form-checkbox>
                        <div style="float: right">
                            <b-button type="button" class="submit-input" v-on:click="discordSave">Save</b-button> 
                        </div> 
                    </b-card>
                </b-collapse>
            <b-col lg="3"/>
            </b-col>
        </b-row>
        <b-popover target="popover-twitch-stream-announcements" triggers="hover">
            If active - it will announce your live stream on main page.
        </b-popover>
        <b-popover target="popover-twitch-panel" triggers="hover" placement="top">
            If active - twitch info panel will be visible on profile screen.
        </b-popover>
        <b-popover target="popover-discord-panel" triggers="hover" placement="top">
            If active - discord info panel will be visible on profile screen.
        </b-popover>
    </div>
</template>

<script>
import axios from 'axios';
const {API_URL} = require('@/constants');
export default {
    props: {
      userID: {
        type: String,
        default: () => {
          return {};
        }
      },
    },
    data: function (){
        return {
            message: '',
            error: '',
            twitch: {
                sharing: false,
                panel: false,
            },
            discord: {
                panel: false,
            }
        }
    },
    watch: {
        message(val) {
            if (val) {
                setTimeout(()=>this.message='',5000);
            }
        },
        error(val) {
            if (val) {
                setTimeout(()=>this.error='false',5000);
            }
        }
    },
    methods:{
        discordSave(){
            axios({
                method: 'patch',
                url: API_URL+'/profiles/discord',
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
                data: {
                    panel: this.discord.panel,
                }
                })
                .then(response=>{  
                if (response.status == '200'){
                    this.message = "Settings saved"
                } else
                if (response.status == '404'){
                    this.error = "profile not found, please contact administrator"
                } else {
                    this.error = "Server error, please contact administrator";
                }
            });
        },
        twitchSave(){
            axios({
                method: 'patch',
                url: API_URL+'/profiles/twitch',
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
                data: {
                    sharing: this.twitch.sharing,
                    panel: this.twitch.panel,
                }
                })
                .then(response=>{  
                if (response.status == '200'){
                    this.message = "Settings saved"
                } else
                if (response.status == '404'){
                    this.error = "profile not found, please contact administrator"
                } else {
                    this.error = "Server error, please contact administrator";
                }
            });
        },
        getData(){
            axios({
                method: 'get',
                url: API_URL+'/profiles/'+this.userID,

            })
            .then( response=>{
                this.twitch.sharing= response.data.data.settings.twitch.sharing;
                this.twitch.panel= response.data.data.settings.twitch.panel;
                this.discord.panel= response.data.data.settings.discord.panel;
            });
        },
    },
    mounted(){
        this.getData();
    }
}
</script>

<style scoped>
.alert{
    max-width: 600px;
    margin: auto;
    margin-top: 20px;
}
#input-group {
    max-width: 600px;
    margin: auto;
}
</style>

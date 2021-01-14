<template>
<div>
    <b-row>
        <b-col lg="3"/>
        <b-col lg="6">
            <button v-b-toggle.collapse-1 type="button" class="social-button" id="toggle-1">
                <img class="social-img" src="@/assets/browser/arrow_down.png" alt="DISCORD">
                <span>Social accounts</span>
            </button>
            <b-collapse id="collapse-1">
                <b-card class="settings-card">
                    <span>Connect other social accounts</span>
                    <button :disabled="discordVerify" type="button" class="social-button" id="discord-button" @click="discordClick">
                        <img class="social-img" src="@/assets/discord.png" alt="DISCORD">
                        <span>Discord</span>
                    </button>
                    <button :disabled="twitchVerify" type="button" class="social-button" id="twitch-button" @click="twitchClick">
                        <img class="social-img" src="@/assets/twitch.svg" alt="Twitch.tv">
                        <span>Twitch</span>
                        </button>
                    </b-card>
            </b-collapse>

            <button v-b-toggle.collapse-10 type="button" class="social-button" id="toggle-10">
                <img class="social-img" src="@/assets/browser/arrow_down.png" alt="Account">
                <span>Account settings</span>
            </button>
            <b-collapse id="collapse-10">
                <b-card class="settings-card">
                    <button type="button" class="social-button" id="delete-button" v-b-modal.delete-account >
                        <span>Delete account (irreversible!)</span>
                    </button>
                </b-card>
            </b-collapse>
        </b-col>
        <b-col lg="3"/>
    </b-row>

    <b-modal
        id="delete-account"
        centered
        scrollable
        hide-header
        hide-footer
        body-class="message-modal-body"
        footer-class="message-modal-footer"
    >
      <form>
            <span>This action is irreversible. 
                You will not be able to log back into your account! 
                To delete your account please enter the following word:</span>
            <h4> DELETE </h4> <br>
            <b-form-input id="name-input" v-model="deleteSafeWord" required></b-form-input>
            <br>
            <div style="float: right">
                <b-button type="button" v-on:click="deleteAccount">Delete</b-button> 
            </div> 
      </form>
    </b-modal>
</div>
</template>

<script>
import axios from 'axios';
const { API_URL } = require("@/constants.js");
const { DISCORD_URL_ADD } = require("@/constants.js");
const { TWITCH_URL_ADD } = require("@/constants.js");
export default {
    props: {
      userID: {
        type: String,
        default: () => {
          return {};
        }
      }
    },
    data() {
        return {
            deleteSafeWord: '',
            discordVerify: false,
            twitchVerify: false,
            facebookVerify: false,
        }
    },
    methods: {
        deleteAccount(){
            if (this.deleteSafeWord == 'DELETE') {
                axios({
                method: 'delete',
                url: API_URL+'/me',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                }
                });
                localStorage.removeItem("userID");
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                this.$router.replace('/');
            }
        },
        discordClick() {
            location.replace(DISCORD_URL_ADD)
        },
        twitchClick() {
            location.replace(TWITCH_URL_ADD)
        },
        checkApisConnected() {
            axios({
                method: 'get',
                url: API_URL+'/apis',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then(response=>{
                if (response.status == '200'){
                    if (response.data.data.discord.id) {
                        this.discordVerify = true;
                    }
                    if (response.data.data.twitch.id) {
                        this.twitchVerify = true;
                    }
                    //this.$router.replace("/settings");     
                }
            });
        }
    },
    mounted() {
        this.checkApisConnected();
    }
}
</script>

<style>
.settings-card {
    background-color: #2b2f33 !important;
}
.settings-card-body {
    float: left;
}
#delete-button {
    background-color: #4d0c0cc2;
}
</style>

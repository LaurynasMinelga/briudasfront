<template>
    <div class="profile-card-body">
        <img class="profile-img" src="@/assets/browser/default-monkey-user.png" alt="...">
        <h4 v-if="profile.nickname">{{profile.nickname}}</h4>
        <h4 v-if="!profile.nickname">Mr. Change-Your-Nick-In-Settings</h4>
        <hr class="hr-custom">
        <span>button</span> <span>button</span> <span>button</span>
        <hr class="hr-custom">
        <button v-b-toggle.collapse-about type="button" class="social-button social-button-about" id="toggle-twitch">
            <span>Show more...</span>
        </button>

        <b-collapse id="collapse-about">
            <b-row v-if="checkNull(profile.name) || checkNull(profile.surname)">
                <b-col cols="4">
                    <label class="label">Full name</label>
                </b-col>
                <b-col cols="8">
                    <p class="text">{{profile.name}} {{profile.surname}}</p>
                </b-col>
            </b-row>

            <b-row v-if="checkNull(profile.birthday)">
                <b-col cols="4">
                    <label class="label">Birthday</label>
                </b-col>
                <b-col cols="8">
                    <p class="text">{{profile.birthday}}</p>
                </b-col>
            </b-row>

            <b-row v-if="checkNull(profile.city)">
                <b-col cols="4">
                    <label class="label">City</label>
                </b-col>
                <b-col cols="8">
                    <p class="text">{{profile.city}}</p>
                </b-col>
            </b-row>

            <b-row v-if="checkNull(profile.about)">
                <b-col cols="4">
                    <label class="label">About</label>
                </b-col>
                <b-col cols="8">
                    <p class="text">{{profile.about}}</p>
                </b-col>
            </b-row>

        </b-collapse>
    </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/constants.js'
export default {
    props: {
        profile: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
        }
    },
    methods:{
         getUser(){
            //fetch profile info
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
        checkNull(item) {
            if (typeof item === 'undefined' || item === null){
                return false;
            }
            else return true;
        }
    },
    mounted(){
        //this.getUser();
    }
}
</script>

<style>
.profile-card-body {
    background-color: transparent;
    color: #D1D1D1;

    margin-top: 30px;
    padding: 20px 20px 20px 20px;
    
    border: none;
    box-shadow: 0 0 10px 5px rgba(0,0,0,0.2);
}

.profile-img {
    max-width: 200px;
    max-height: 200px;
    margin-bottom: 30px;
    border-radius: 50%;

    box-shadow: 0 0 10px 5px rgba(0,0,0,0.2);
}

.social-button-about {
    width: 100% !important;
    min-height: 20px !important;

    font-size: 1.1em !important;

    border-top: 2px solid transparent !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    border-bottom: none !important;
    box-shadow: 0 0 15px 5px rgba(0,0,0,0.2) !important;
}

.social-button-about:focus {
    outline-color: rgba(0,0,0,0.2) !important;
}

.social-button-about:active {
    outline-color: rgba(0,0,0,0.2) !important;
}

.label{
    font-weight: bold;
}

#collapse-about {
    margin-top: 15px;
}
</style>
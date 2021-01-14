<template>
    <div>
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group"
                label="Steam"
                label-for="steam-input"
                description="Paste link to your account">
                    <b-form-input
                    id="steam-input"
                    v-model="gaming.steam">
                    </b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group"
            label="Blizzard"
            label-for="blizzard-input"
            description="Paste link to your account">
                <b-form-input
                id="blizzard-input"
                v-model="gaming.blizzard">
                </b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group"
            label="Origin"
            label-for="origin-input"
            description="Paste link to your account">
                <b-form-input
                id="origin-input"
                v-model="gaming.origin">
                </b-form-input>
            </b-form-group>

            <div
            v-if="message"
            class="alert alert-dark"
            role="alert">
                {{message}}
            </div>

            <b-button id="submit-input" type="submit">Save</b-button>
        </b-form>
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
      }
    },
    data: function (){
        return {
            message: '',
            gaming: {
                steam: null,
                blizzard: null,
                origin: null
            }
        }
    },
    methods: {
        onSubmit() {
            axios({
                method: 'patch',
                url: API_URL+'/profiles/apps',
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            data: {
                steam: this.gaming.steam,
                blizzard: this.gaming.blizzard,
                origin: this.gaming.origin
            }
            })
            .then(response=>{
                if (response.status == '200'){
                    this.message = "Profile updated"
                } else
                if (response.status == '404'){
                    //manage redirect to creation of profile
                } else {
                    this.message = "Server error, please contact administrator";
                }
            });
        },
        getData(){
            axios({
                method: 'get',
                url: API_URL+'/profiles/'+this.userID,

            })
            .then( response=>{
                this.gaming.steam= response.data.data.apps.steam;
                this.gaming.blizzard= response.data.data.apps.blizzard;
                this.gaming.twitter= response.data.data.apps.twitter;
            });
        },
    },
    mounted(){
        this.getData();
    },
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
#submit-input{
    min-width: 200px;
    margin-top: 20px;
}
#steam-input{
    background-color: #2b2f33;
    color: rgba(255, 255, 255, 0.5);
}
#blizzard-input{
    background-color: #2b2f33;
    color: rgba(255, 255, 255, 0.5);
}
#origin-input{
    background-color: #2b2f33;
    color: rgba(255, 255, 255, 0.5);
}
</style>

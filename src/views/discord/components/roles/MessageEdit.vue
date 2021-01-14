<template>
<div>
    <div
      v-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >{{errorMessage}}</div>

    <b-form @submit.stop.prevent="handleSubmit">
        <b-form-group
        label="Title"
        label-for="title-input">
            <b-form-input
                id="title-input"
                v-model="message.title"
                required
            ></b-form-input>
            <b-form-text id="title-help-block">
            Title must be 1-40 characters long.
            </b-form-text>
        </b-form-group>

        <b-form-group
        label="Roles"
        label-for="roles-input">
            <b-row 
            v-for="reaction in reactions"
            :key="reaction.emojiID">
                <b-col cols="6">
                    <b-input-group 
                    v-bind:prepend="defineEmojiNumber(reaction)" 
                    class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input 
                        v-bind:id="'name-'+reaction.emojiID" 
                        v-model="description[defineEmojiNumber(reaction)].name"
                        placeholder="Pavadinimas">
                        </b-input>
                    </b-input-group>
                </b-col>
                <b-col cols="5">
                    <b-form-select
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="reaction.roleID"
                    :options="rolesSorted"
                    v-bind:id="'select-'+reaction.emojiID"
                    required>
                    </b-form-select>
                </b-col>
            </b-row>
        </b-form-group>

        <b-form-group
        label="Footer"
        label-for="footer-input">
            <b-form-input
                id="footer-input"
                v-model="message.footer"
                required
            ></b-form-input>
            <b-form-text id="footer-help-block">
            Footer must be 1-60 characters long.
            </b-form-text>
        </b-form-group>

        <b-form-group
        label="Message color"
        label-for="color-input">
            <b-form-radio-group
                id="btn-radios"
                v-model="message.hexColor"
                :options="colorOptions"
                buttons
                name="radios-btn-default"
            ></b-form-radio-group>
        </b-form-group>

        <div style="float: right;">
            <b-button type="submit">Save</b-button>
            <b-button type="button" v-on:click="$emit('closeModal')">Cancel</b-button>  
        </div>
        
     </b-form>
</div>
</template>

<script>
import axios from 'axios';
import Joi from 'joi';
const {API_URL} = require('@/constants');
const MESSAGES_URL = API_URL+'/messages/';
const REACTIONS_URL = API_URL+'/reactions/';
const ROLES_URL = API_URL+'/roles/';
const schema = Joi.object().keys({
    title: Joi.string()
    .regex(/[^]{1,40}$/)
    .required(),
    footer: Joi.string()
    .regex(/[^]{1,200}$/)
    .required()
});
export default {
    props: {
        messageID: {
            type: String,
            default:() => {
                return{};
            }
        }
    },
    data: function() {
        return {
            message: {
                _id: this.messageID,
                description: null,
                title: null,
                footer: null,
                hexColor: null,
            },
            prependNR: 0,
            description: [
                { emojiID: '640311114512596992', name: null, roleID: null},
                { emojiID: '640328805050875917', name: null, roleID: null},
                { emojiID: '640328804988092436', name: null, roleID: null},
                { emojiID: '640328805394808842', name: null, roleID: null},
                { emojiID: '640328805273174056', name: null, roleID: null},
                { emojiID: '640328805319442462', name: null, roleID: null},
                { emojiID: '640328805382225930', name: null, roleID: null},
                { emojiID: '640328805344477185', name: null, roleID: null},
                { emojiID: '640328805394808872', name: null, roleID: null},
                { emojiID: '640328805369511938', name: null, roleID: null}
            ],
            reactions: null,
            roles: null,
            rolesSorted: [],
            errorMessage: '',
            colorOptions: [
                { text: 'Red', value: '#ff0000' },
                { text: 'Green', value: '#00ba09' },
                { text: 'Blue', value: '#00188f' },
                { text: 'Black', value: '#000000' },
                { text: 'White', value: '#ffffff' },
            ],
            roleids: [
                "640311114512596992",
                "640328805050875917",
                "640328804988092436",
                "640328805394808842",
                "640328805273174056",
                "640328805319442462",
                "640328805382225930",
                "640328805344477185",
                "640328805394808872",
                "640328805369511938",
            ],
        }
    },
    methods: {
        getMessage(){
            return axios({
                method: 'get',
                url: MESSAGES_URL+this.$props.messageID+'/message',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then (response =>{
                this.message = response.data.data;
            });
        },
        getReactions(){
            return axios({
                method: 'get',
                url: REACTIONS_URL+this.$props.messageID,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then (response => {
                this.reactions = response.data.data;
                
            });
        },
        getRoles(){
            return axios({
                method: 'get',
                url: ROLES_URL,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then (response => {
                this.roles = response.data.data;
            });
        },
        populateSelect(){
            var i;
            for (i=0;i<this.roles.length;i++) {
                this.rolesSorted = this.rolesSorted.concat({ text: this.roles[i].name, value: this.roles[i].ID });
            }
        },
        handleSubmit(){
            this.errorMessage = "";
            if (this.validateInput()) {
                this.serializeDescription();
                const body = {
                    description: this.message.description,
                    title: this.message.title,
                    footer: this.message.footer,
                    hexColor: this.message.hexColor,
                };
                axios({
                method: 'patch',
                url: MESSAGES_URL+this.$props.messageID+'/message',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
                data: {
                    title: this.message.title,
                    description: this.message.description,
                    footer: this.message.footer,
                    hexColor: this.message.hexColor,
                },
                })
                .then (response =>{
                    
                    if (response.status == '200'){
                        this.errorMessage = "Profile updated"
                    } else
                    if (response.status == '404'){
                        this.errorMessage = "Message not found, please contact administrator";
                    } else {
                        this.errorMessage = "Server error, please contact administrator";
                    }
                })
                .then(this.updateReactions)
                .then(this.cancelEvent);
            }
        },
        updateReactions(){
            var i;
            for(i=0;i<this.reactions.length;i++) {
                axios({
                    method: 'patch',
                    url: REACTIONS_URL+this.reactions[i]._id,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.token}`
                    },
                    data: {
                        roleID: this.reactions[i].roleID
                    },
                });
            }
        },
        validateInput(){
            const result = Joi.validate(this.message, schema);
            if (result.error === null) {
                return true;
            }
            if (result.error.message.includes("title")) {
                this.errorMessage = "Title is invalid.";
                return false;
            }
            if (result.error.message.includes("footer")) {
                this.errorMessage = "Footer is invalid.";
                return false;
            }
            this.errorMessage = "One of role names is invalid.";
            return true;
        },
        cancelEvent(){
            return this.$router.go(this.$router.currentRoute.path);
        },
        defineEmojiNumber(reaction){
            var i;
            for (i=0;i<10;i++){
                if (reaction.emojiID == this.roleids[i]){ return `${i}`}
            }
        },
        deserializeDescription(){
            if (this.message.description.startsWith("0")) {
                var i; var j=0;
                for(i=0;i<this.reactions.length;i++) {
                    var from = this.message.description.indexOf(`${j++}`);
                    var to = this.message.description.indexOf('\n');
                    if ( i<9 ) {
                        var name = this.message.description.slice(from+5, to);
                    } else {
                        var name = this.message.description.slice(from+4, to);
                    }
                    
                    this.description[i].name = name;
                    this.message.description = this.message.description.slice(to+2);
                }
            } else {
                return ;
            }
        },
        serializeDescription(){
            this.message.description = "";
            var i;
            for(i=0;i<this.reactions.length;i++) {
                if (i<9) {
                    this.message.description = this.message.description.concat(`${i}  - ${this.description[i].name}\n`);
                } else {
                    this.message.description = this.message.description.concat(`${i} - ${this.description[i].name}\n`);
                }
            }
        }
    },
    mounted() {
        this.getMessage()
        .then( this.getReactions)
        .then( this.getRoles)
        .then( this.populateSelect)
        .then( this.deserializeDescription)
    }
}
</script>

<style scoped>
#name-input{
    max-width: 80%;
    margin-bottom: 5px;
}
#select-input{
    max-width: 80%;
    margin-bottom: 5px;
    background-color: #2b2f33;
    color: rgba(255, 255, 255, 0.5);
}
.input-group-prepend{
    margin-bottom: 5px;
}
.form-control{
    background-color: #2b2f33;
    color: rgba(255, 255, 255, 0.5);
}
</style>

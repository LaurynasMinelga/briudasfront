<template>
    <div>
        <div v-if="message" class="alert alert-dark" role="alert">{{message}}</div>
        <div v-if="error" class="alert alert-dark" role="alert">{{error}}</div>
        <b-form @submit="onSubmit">
            <b-form-group
            id="input-group"
            label="Name"
            label-for="name-input"
            description="Your true name will be visible to everyone">
                <b-form-input
                id="name-input"
                class="input-dark"
                v-model="profile.name">
                </b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group"
            label="Surname"
            label-for="surname-input"
            description="Your true surname will be visible to everyone">
                <b-form-input
                id="surname-input"
                class="input-dark"
                v-model="profile.surname">
                </b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group"
            label="Nickname"
            label-for="nickname-input"
            description="Your nick name must be very unique">
                <b-form-input
                id="nickname-input"
                class="input-dark"
                v-model="profile.nickname">
                </b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group"
            label="About"
            label-for="about-input"
            description="Tell us a joke">
                <b-form-textarea
                id="about-input"
                class="input-dark"
                v-model="profile.about"
                rows="3"
                max-rows="12">
                </b-form-textarea>
            </b-form-group>

            <b-form-group
            id="input-group"
            label="Birthday"
            label-for="birthday-input"
            description="From what century are you?">
                <b-input-group>
                    <b-form-input
                    id="birthday-input"
                    v-model="profile.birthday"
                    type="text"
                    class="input-dark"
                    placeholder="YYYY-MM-DD">
                    </b-form-input>
                    <b-input-group-append class="input-dark">
                        <b-form-datepicker
                        v-model="profile.birthday"
                        button-only
                        dark
                        right
                        locale="en"
                        class="input-dark"
                        aria-controls="birthday-input"
                        ></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>

            <b-form-group
            id="input-group"
            label="City"
            label-for="city-input"
            description="In which planet do you live?">
                <b-form-input
                id="city-input"
                class="input-dark"
                v-model="profile.city">
                </b-form-input>
            </b-form-group>

            <b-button id="submit-input1" class="submit-input" type="submit">Save</b-button>
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
      },
    },
    data: function (){
        return {
            message: '',
            error: '',
            profile: {     
                name: null,
                surname: null,
                nickname: null,
                about: null,
                birthday: null,
                city: null
            },
            exist: false,
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
     methods: {
        onSubmit() {
            axios({
                method: 'patch',
                url: API_URL+'/profiles/about',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
                data: {
                    name: this.profile.name,
                    surname: this.profile.surname,
                    nickname: this.profile.nickname,
                    about: this.profile.about,
                    birthday: this.profile.birthday,
                    city: this.profile.city,
                }
            })
            .then(response=>{
                if (response.status == '200'){
                    this.message = "Profile updated"
                } else
                if (response.status == '404'){
                    this.error = "Error, pleace contact administrator"
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
                if (response.status === 200) {
                    this.profile.name = response.data.data.name;
                    this.profile.surname = response.data.data.surname;
                    this.profile.nickname = response.data.data.nickname;
                    if (response.data.data.birthday) {
                        this.profile.birthday = response.data.data.birthday.slice(0,10);
                    }
                    this.profile.about = response.data.data.about;
                    this.profile.city= response.data.data.city;
                } 
            });
        }
    },
    mounted() {
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
.input-dark{
    background-color: #2b2f33;
    color: rgba(255, 255, 255, 0.5);
}
.submit-input{
    min-width: 200px;
    margin-top: 20px;
}
</style>

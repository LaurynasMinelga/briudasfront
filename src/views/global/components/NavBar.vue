<template>
    <header>
        <b-navbar toggleable="lg" type="dark" class="navigation">

            <b-navbar-brand :to="{ name: 'discord'}">
                <img src="@/assets/weplaymonkey.png" class="d-inline-block align-top logo-img" alt="Logo">
                <span> WEplay</span>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'discord'}">Dashboard</b-nav-item>
                <b-nav-item :to="{ name: 'twitch'}">Twitch!</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                 <b-nav-item v-if="roles.dsAdmin" :to="{ name: 'manager'}">Manage Server</b-nav-item>
                 <!--<b-nav-item v-if="loggedIn" v-on:click="logout()">Logout</b-nav-item>-->
                
                <!--dropdown menu-->
                
                <b-nav-item-dropdown v-if="loggedIn" v-bind:text="username" right>
                    <b-dropdown-item :to="{ name: 'profile', params: { id: userID}}">Profile</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'settings'}">Settings</b-dropdown-item>
                    <b-dropdown-item v-if="loggedIn" v-on:click="logout()">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
                
                
                <b-nav-item v-if="!loggedIn" :to="{ name: 'signup'}">Sign Up</b-nav-item>
                <b-nav-item v-if="!loggedIn" :to="{ name: 'login'}">Log In</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
import axios from 'axios';
const { API_URL } = require("@/constants.js");
const { REDIRECT_URL } = require("@/constants.js");
const SECRET_URL = API_URL + "/secret";
const LOGOUT_URL = API_URL + "/logout";
export default {
 name: 'NavBar',
    mounted() {
        if (document.location.href.includes("token")){
        localStorage.token = document.location.href.slice(-211, -2);
        window.location.href = REDIRECT_URL
        }
        if (document.location.href.includes("email")) {
            var id_location = document.location.href.indexOf('id');
            var email_location = document.location.href.indexOf('email');
            var api_location = document.location.href.indexOf('api');
            var id = document.location.href.slice(id_location+3, api_location-1);
            var api = document.location.href.slice(api_location+4, email_location-1);
            var email = document.location.href.slice(email_location+6,-2);
            switch (api) {
                case "discord": 
                    var url = '/discord/add'
                    break;
                case "twitch": 
                    var url = '/twitch/add'
                    break;
            }
            axios({
                    method: 'post',
                    url: API_URL+url,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.token}`
                    },
                    data: {
                        id: id,
                        email: email
                    }
                })
                .then(response=>{
                    this.$router.replace("/settings");
                });
        }
        fetch(SECRET_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        },
        cache: "no-store"
        
        })
        .then(response => {
            //     console.log(response);
            if (response.ok) {
            return response.json();
            }
            return response.json().then(error => {
            throw new Error(error.error);
            });
        })
        .then(result => {
            // console.log("result", result);
            localStorage.userID = result.secret;
            this.userID = localStorage.userID;
            if (result.username) {
                this.username = result.username;
            }
        })
        .catch(error => {
            //console.log("error", error);
        });
        this.setLoggedIn();
        this.checkRoles();
  },
    data: () => ({
        userID: null,
        username: "User",
        loggedIn: false,
        roles: {
            dsAdmin: false,
            webAdmin: false,
            superAdmin: false
        }
    }),
    methods: {
        logout() {
            fetch(LOGOUT_URL, {
                headers: {
                Authorization: `Bearer ${localStorage.token}`
                }
            });
            localStorage.removeItem("userID");
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            this.loggedIn = false;
            this.username = null;
            this.userID = null;
            this.roles.dsAdmin = false;
            this.roles.webAdmin = false;
            this.roles.superAdmin = false;
            this.$router.replace("/");
        },
        setLoggedIn() {
            if (localStorage.token){
                this.loggedIn = true
            } else {
                this.loggedIn = false
            }
        },
        checkRoles(){
            axios({
                method: 'get',
                url: API_URL+'/me',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then(response =>{
                if (response.data.data.roles != undefined) {
                    this.roles = response.data.data.roles;
                }
            });
        }
    }
};
</script>

<style>
header{
    margin: auto;
    max-width: 1500px;
}
.logo-img{
    border-radius: 60%;
    width: 30px;
    height: 30px;
} 
.bg-dark{
    background-color: #1f2225;
}
</style>

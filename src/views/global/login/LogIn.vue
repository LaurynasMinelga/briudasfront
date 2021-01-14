<template>
    <section>
        <h1>Log in with</h1>

        <div v-if="loggingIn">
        <img src="@/assets/spinner.svg">
        </div>
        <div
        v-if="errorMessage"
        class="alert alert-danger"
        role="alert"
        >{{errorMessage| filtermessage }}</div>

        <div class="container" v-if="!loggingIn">
        <div class="row">
            <div class="col-lg=3 col-md-2 col-sm-1 col-xs-12"></div>
            <div class="col-lg=6 col-md-8 col-sm-10 col-xs-12">
            <div class="btn-group d-flex align-items-start justify-content-around">

                <discord-component></discord-component>
                <div class="space" style="margin-left:15px;"></div>
                <twitch-component></twitch-component>
                <!-- <facebook-component></facebook-component> -->
            </div>
            <form class="mt-2 form-global" @submit.prevent="signin()">
                <div class="form-group">
                <label for="email">Email</label>
                <input
                    v-model="user.email"
                    type="text"
                    class="form-control-global"
                    id="email"
                    aria-describedby="emailHelp"
                    required
                >
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input
                    v-model="user.password"
                    type="password"
                    class="form-control-global"
                    id="password"
                    aria-describedby="passwordHelp"
                    required
                >
                </div>
                <button type="submit" class="button-submit">Signin</button>
            </form>
            <br>
            <div>
                Don’t have an account?
                <router-link to="/signup">Sign up</router-link>
            </div>
            </div>
            <div class="col-lg=3 col-md-2 col-sm-1 col-xs-12"></div>
        </div>
        </div>
    </section>
</template>

<script>
import Joi from "joi";
import Vue from "vue";
// @ is an alias to /src
import FacebookComponent from '@/views/global/components/login/FacebookButton.vue';
import DiscordComponent from '@/views/global/components/login/DiscordButton.vue';
import TwitchComponent from '@/views/global/components/login/TwitchButton.vue';
const { API_URL } = require("@/constants.js");
const SIGNIN_URL = API_URL + "/signin";
const schema = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{5,30}$/)
        .required()
});
export default {
    components: {
        //"google-component": GoogleComponent,
        "discord-component": DiscordComponent,
        "facebook-component": FacebookComponent,
        'twitch-component': TwitchComponent,
    },
    data: () => ({
        errorMessage: "",
        loggingIn: false,
        user: {
        email: "",
        password: ""
        }
    }),
    filters: {
        filtermessage: value => {
        if (value.includes("Unexpected token"))
            return "email and password do not match.";
        else return value;
        }
    },
    watch: {
        errorMessage(val) {
            if (val) {
                setTimeout(()=>this.errorMessage='',5000);
            }
        }
    },
    methods: {
        signin() {
        this.errorMessage = "";
        if (this.validUser()) {
            this.loggingIn = true;
            const body = {
            email: this.user.email,
            password: this.user.password
            };
            fetch(SIGNIN_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                }
                return response.json().then(error => {
                throw new Error(error.message);
                });
            })
            .then(result => {
                localStorage.token = result.token;
                this.loggingIn = false;
                this.$router.go("/");
            })
            .catch(error => {
                this.loggingIn = false;
                this.errorMessage = error.message;
            });
        }
        },
        validUser() {
        const result = Joi.validate(this.user, schema);
        //  console.log(result);
        if (result.error === null) {
            return true;
        }
        if (result.error.message.includes("email")) {
            this.errorMessage = "email is invalid.";
            return false;
        }
        this.errorMessage = "Password is invalid.";
        return false;
        }
    }
};
</script>

<style>
h1 {
  padding-top: 10px;
  text-align: center;
}

.button-submit {
  background-color: #2b2f33;
  width: 50%;
  height: 60px;

  color: #D1D1D1;
  font-size: 1.5em;

  margin-top: 5px;
  margin-bottom: 5px;

  border: none;
  box-shadow: 0 0 10px 5px rgba(0,0,0,0.2);
}

.button-submit:hover {
  /*box-shadow: 0 0 8px 3px rgba(209, 209, 198, 0.2);*/
  transform: translate(0px, -3px);
}

.button-submit:active {
  border-width: 5px;
  border-color: #D1D1D1;
  outline: none;
}

.form-global {
  background-color: #2b2f33;

  padding: 20px 20px 20px 20px;
  margin-top: 30px;

  box-shadow: 0 0 10px 5px rgba(0,0,0,0.2);
}

.form-control-global {
  display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #D1D1D1;
    background-color: #1f2225;
    background-clip: padding-box;
    border: none;
    box-shadow: 0 0 10px 5px rgba(0,0,0,0.2);
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.form-control-global:focus {
  outline-color: #D1D1D1;
}
</style>
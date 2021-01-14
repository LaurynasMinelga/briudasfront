<template>
  <!--facebook button -->
  <button type="button" class="social-button" @click="facebook">
    <img class="social-img" src="@/assets/facebook.svg" alt="FACEBOOK">
    <span>facebook</span>
  </button>
</template>

<script>
import Vue from "vue";
const { API_URL } = require("@/constants.js");
const FACEBOOK_URL = API_URL + "/facebook";
export default {
  methods: {
    facebook() {
      const fetchFacebook = response => {
        fetch(FACEBOOK_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            access_token: response.authResponse.accessToken
          })
        })
          .then(response => {
            if (response.ok) return response.json();
            return response.json().then(error => {
              throw new Error(error.message);
            });
          })
          .then(result => {
            localStorage.token = result.token;
            this.$router.go("/");
          })
          .catch(error => {
            // console.log("error", error);
          });
      };
      FB.getLoginStatus(response => {
        //  console.log("status", response.status);
        if (response.status === "connected") fetchFacebook(response);
        else
          FB.login(response => {
            //console.log("response face:", response);
            fetchFacebook(response);
          });
      });
    }
  }
};
</script>

<style>

</style>

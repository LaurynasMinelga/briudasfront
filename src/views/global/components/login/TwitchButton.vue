<template>
  <!--facebook button -->
  <button type="button" class="social-button" @click="getData">
    <img class="social-img" src="@/assets/twitch.svg" alt="Twitch.tv">
    <span>Twitch</span>
  </button>
</template>

<script>
import Vue from "vue";
const { API_URL } = require("@/constants.js");
const { TWITCH_URL } = require("@/constants.js");
export default {
  methods: {
      getData() {
        location.replace(TWITCH_URL)
      }
    }
};
</script>

<style>

</style>
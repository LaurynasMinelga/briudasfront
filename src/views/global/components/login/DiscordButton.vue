<template>
  <!--facebook button -->
  <button type="button" class="social-button" @click="getData">
    <img class="social-img" src="@/assets/discord.png" alt="DISCORD">
    <span>Discord</span>
  </button>
</template>

<script>
import Vue from "vue";
const { API_URL } = require("@/constants.js");
const { DISCORD_URL } = require("@/constants.js");
export default {
  methods: {
      getData() {
        location.replace(DISCORD_URL)
      }
    }
};
</script>

<style>
.social-img {
  float: left;
  width: 40px;
  height: 40px;

  margin-right: 10px;
}
</style>
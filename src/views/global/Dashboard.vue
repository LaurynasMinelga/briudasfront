<template>
<div>
    <div class="card-columns">
            <UserCard 
            v-for="user in users"
            :key="user._id"
            :user="user"></UserCard>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import UserCard from '@/views/user/components/global/UserCard.vue'
const { API_URL } = require("@/constants");
const TOP_URL = API_URL+'/points/top/five'; //top users url
export default {
    components: {
      UserCard
    },
    data: function () {
        return {
            users: null,
            message: null, //nereik
            mID: '640922970637991956' //nereik
        }
    },
    mounted(){
        this.getTopUsers();
    },
    methods: {
        getTopUsers() {
           axios({
               method: 'put',
               url: TOP_URL,
               data: {
                   skip: '0',
                   limit: '10',
               },
               headers: {
                   "Content-Type": "application/json"
               },
           })
           .then(response =>{
               this.users = response.data.data;
           });
        },

        test() {
            fetch(API_URL+'/messages', {
                headers: {
                Authorization: `Bearer ${localStorage.token}`
                },
                cache: "no-store"
            })
            .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(error => {
          throw new Error(error.error);
        });
      })
      .then(result => {
        console.log("result", result);
        this.message = result.data;
        console.log('data:', this.message[1])
      })
      .catch(error => {
        //console.log("error", error);
      });
        }
    }
}
</script>

<style>
</style>

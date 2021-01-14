<template>
    <div v-if="channels.length>0">
        <Channel
        v-for="channel in channels"
        :key="channel._id"
        :channel="channel"
        ></Channel>
    </div>
</template>

<script>
import axios from 'axios';
import Channel from '@/views/discord/components/roles/Channel.vue'
const {API_URL} = require("@/constants");
const CHANNEL_URL = API_URL+'/channels'; // get channels with messages
export default {
    name: 'channels',
    components: {
        Channel,
    },
    data: function() {
        return {
            channel: {
                _id: '',
            },
            channels: {
                _id: '',
                name: null,
                count: null
            }
        }
    },
    methods: {
        getChannels(){
            axios({
                method: 'get',
                url: CHANNEL_URL,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
            })
            .then (response =>{
                this.channels = response.data.data;
                console.log(response.data.data);
            });
        },
    },
    mounted() {
        this.getChannels();
    }
}
</script>
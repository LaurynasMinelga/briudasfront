<template>
    <div>
        <Message
        v-for="message in messages"
        :key="message._id"
        :message="message"
        v-on:click.native="showModal(message);">
        </Message>
        <b-modal ref="my-modal" 
        size="lg" 
        centered
        scrollable
        hide-header
        hide-footer
        body-class="message-modal-body"
        footer-class="message-modal-footer">
            <MessageEdit
            :messageID="passID"
            v-on:closeModal="hideModal"
            ></MessageEdit>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import Message from '@/views/discord/components/roles/Message.vue'
import MessageEdit from '@/views/discord/components/roles/MessageEdit.vue'
const {API_URL} = require("@/constants");
const MESSAGE_URL = API_URL+'/messages/'; // get messages from channel
export default {
    name: 'channels',
    components: {
        Message,
        MessageEdit,
    },
    data: function() {
        return {
            messages: {
                _id: null,
                title: null
            },
            passID: null,
        }
    },
    methods: {
        getMessages(){
            axios({
                method: 'get',
                url: MESSAGE_URL+this.$route.params.id,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
            })
            .then (response =>{
                this.messages = response.data.data;
            });
        },
        showModal(item) {
        this.passID = item._id;
        this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
    },
    mounted() {
        this.getMessages();
    }
}
</script>

<style>
.message-modal-body{
    color: rgba(255, 255, 255, 0.5);
    background-color: #2b2f33;
}
.message-modal-footer{
    color: rgba(255, 255, 255, 0.5);
    background-color: #2b2f33;
}
</style>
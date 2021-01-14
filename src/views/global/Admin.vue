<template>
<div>
    <div
        v-if="message != ''"
        class="alert alert-danger"
        role="alert">
            {{message}}
    </div>
    <b-form v-if="!admin" @submit="onSubmit">
        <b-form-group
        id="input-group"
        label="Password"
        label-for="password-input"
        description="Admin password, given to super-admin">
            <b-form-input
            id="password-input"
            type="password"
            v-model="password">
            </b-form-input>
        </b-form-group>
        <br>
        <b-button id="submit-input" type="submit">Send</b-button>
    </b-form>
    <!-- user edit  area -->
    <div v-if="admin">
        <UserAddRole
        v-for="user in users"
        :key="user._id"
        :user="user"
        v-on:click.native="showModal(user);">
        </UserAddRole>
    </div>
    <b-modal ref="my-modal" 
        size="lg" 
        centered
        scrollable
        hide-header
        hide-footer
        body-class="message-modal-body"
        footer-class="message-modal-footer">
            <b-form @submit="SaveUser">
                <div>
                    <p>ID: {{selected._id}}</p>
                    <p>Discord email: {{selected.discord.email}}</p>
                    <p>Discord ID: {{selected.discord.id}}</p>
                </div>
                <b-row class="checkboxes">
                    <b-form-checkbox
                    id="checkbox-1"
                    v-model="selected.roles.superAdmin"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="false">
                    Super-admin
                    </b-form-checkbox>

                    <b-form-checkbox
                    id="checkbox-2"
                    v-model="selected.roles.dsAdmin"
                    name="checkbox-2"
                    value="true"
                    unchecked-value="false">
                    Discord-admin
                    </b-form-checkbox>

                    <b-form-checkbox
                    id="checkbox-3"
                    v-model="selected.roles.webAdmin"
                    name="checkbox-3"
                    value="true"
                    unchecked-value="false">
                    Web-admin
                    </b-form-checkbox>
                </b-row>
                <div style="float: right;">
                    <b-button type="submit">Save</b-button>
                    <b-button @click="hideModal">Close</b-button>
                </div>
            </b-form>
        </b-modal>
</div>    
</template>

<script>
import axios from 'axios';
import UserAddRole from '@/views/user/components/admin/UserAddRole.vue';
const {API_URL} = require('@/constants');
const USERS_URL = API_URL+'/users';
export default {
    components: {
        UserAddRole,
    },
    data: function() {
        return {
            password: null,
            admin: false,
            message: "",
            users: {
                _id: '',
            },
            selected: {
                _id: null,
                discord: {
                    email: null,
                    id: null
                },
                roles: {
                    dsAdmin: null,
                    webAdmin: null,
                    superAdmin: null
                }
            }
        }
    },
    mounted() {
        this.setAdmin();
        this.getUsers();
    },
    methods: {
        setAdmin() {
            if (localStorage.admin){
                this.admin = true
            } else {
                this.admin = false
            }
        },
        SaveUser() {
            axios({
                method: 'patch',
                url: API_URL+'/users/'+this.selected._id+'/roles',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
                data: {
                    superAdmin: this.selected.roles.superAdmin,
                    webAdmin: this.selected.roles.webAdmin,
                    dsAdmin: this.selected.roles.dsAdmin,
                }
            })
            .then(response=>{
                if (response.status == '200'){
                    this.message = "";
                    this.$router.go("/admin");
                }  else {
                    this.message = "Server error, please contact administrator";
                }
            });
        },
        onSubmit() {
            this.message = "";
            axios({
                method: 'post',
                url: API_URL+'/admin',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
                data: {
                    password: this.password,
                }
            })
            .then(response=>{
                if (response.status == '200'){
                    localStorage.admin = true;
                    this.message = "";
                    this.$router.go("/admin");
                } else
                if (response.status == '400'){
                    this.message = "Password incorrect!";
                } else {
                    this.message = "Server error, please contact administrator";
                }
            });
        },
        getUsers(){
            axios({
                method: 'get',
                url: USERS_URL,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
            })
            .then (response =>{
                this.users = response.data.data;
            });
        },
        showModal(item) {
        this.selected._id = item._id;
        console.log(`${item._id} is equal to ${this.selected._id}`);
        if (item.discord) {
            this.selected.discord.email = item.discord.email;
            this.selected.discord.id = item.discord.id;
        } else {
            this.selected.discord.email = null;
            this.selected.discord.id = null;
        }
        if (item.roles) {
            this.selected.roles = item.roles;
        } else {
            this.selected.roles.dsamin = false;
            this.selected.roles.superAdmin = false;
            this.selected.roles.webAdmin = false;
        }
        this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
    },

}
</script>

<style scoped>
#input-group {
    max-width: 50%;
    margin: auto;
}
#checkbox-1 {
    margin-right: 500px;
}
</style>
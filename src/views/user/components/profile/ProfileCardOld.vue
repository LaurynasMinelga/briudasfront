<template>
    <div class="card">
        <img class="card-img-top" src="img/anime6.png" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{user.username}}</h5>
            <p class="card-text">
                <b-badge variant="light">Total points: {{amount}}</b-badge>
            </p>
            <div v-if="userID != $route.params.id">
                <p v-if="show.nextreceive">Can receive point on: {{nextreceive.format("dddd, HH:mm")}}</p>
                <p v-if="show.nextpoint">Point will be available: {{nextpoint.format("dddd, HH:mm")}}</p>
                <div v-if="!show.nextpoint && !show.nextreceive">
                    <b-button v-on:click="addPoint()">Increase! +1</b-button>
                </div>
                <b-button v-if="canpush" v-on:click="removePoint">Refund -1</b-button>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
const { API_URL } = require("@/constants");
var moment = require('moment');
export default {
    props: {
        user: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data: function() {
        return{
            date: moment(),
            amount: null,
            nextpoint: null,
            nextreceive: null,
            canpush: false,
            show: {
                nextreceive: false,
                nextpoint: false,
                addButton: false,
                removeButton: false
            },
            userID: localStorage.userID,
        }
    },
    methods: {
        //fetch user points sum
        getPoints(){
             axios({
                method: 'get',
                url: API_URL+'/points/'+this.$route.params.id+'/received/sum'
            })
            .then(response =>{
                this.amount = response.data.data[0].amount;
            });
        },
        nextPoint() {
             axios({
                method: 'get',
                url: API_URL+'/points/nextpoint',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then(response => {
                this.nextpoint = moment(response.data.nextPoint);
                var date = moment();
                if (this.nextpoint.diff(date) > 0){
                    this.show.nextpoint = true;
                }
            });
        },
        nextReceive(){
             axios({
                method: 'get',
                url: API_URL+'/points/'+this.$route.params.id,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then(response => {
                this.nextreceive = moment(response.data.nextPoint);
                var date = moment();
                if (this.nextreceive.diff(date) > 0){
                    this.show.nextreceive = true;
                }
            })
        },
        addPoint() {
            axios({
                method: 'post',
                url: API_URL+'/points/'+this.$route.params.id,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            })
            .then(response => {

                console.log("click",response.status);
            });
                this.nextPoint();
                this.nextReceive();
                this.getPoints();
        },
        removePoint() {

        }
    },
    mounted() {
        this.getPoints();
        this.nextPoint();
        this.nextReceive();
    }
}
</script>

<style scoped>
a{
    color:none;
    text-decoration: none;
}
a:hover{
    color: rgba(255, 255, 255, 0.8);;
    text-decoration: none;
}
.card{
    min-width: 150px;
    align-items: center;
    background-color: #2b2f33;
}
.card-img-top{
    width: 124px;
    height: 124px;
    border: 5px solid #2b3553;
    border-bottom-color: transparent;
    background-color: transparent;
    position: relative;
}
.badge{
    font-size: 100%;
}
</style>
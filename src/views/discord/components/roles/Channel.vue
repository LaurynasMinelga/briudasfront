<template>
    <b-row>
        <router-link :to="{ name: 'channel', params: { id: channel._id}}">
        <b-card>
            <b-row>
                <b-col cols="5">
                <label class="label">{{channel.name}}</label>
                </b-col>
                <b-col cols="6">
                    <p class="text">Total messages in channel: {{channel.count}}</p>
                </b-col>
            </b-row>
        </b-card>
        </router-link>
    </b-row>
</template>

<script>
export default {
    props: {
        channel: {
          type: Object,
          default:() =>{
              return{};
          }  
        }
    },
}
</script>

<style scoped>
.row{
    margin-left: 0px;
}
.card{
    text-align: left;
    cursor: pointer;
    background-color: #2b2f33;
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin-top: 20px;
}
a{
    width: 80%;
    margin: auto;
}
.label{
    font-weight: bold;
    font-size: 20px;
}
</style>

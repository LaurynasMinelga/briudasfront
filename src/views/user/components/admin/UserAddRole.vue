<template>
    <b-row>
        <b-card>
            <b-row>
                <b-col cols="5" >
                    <label class="label">{{user._id}}</label>
                </b-col>
                <b-col cols="6" >
                    <p v-if="user.discord" class="text"> Email: {{user.discord.email}} id: {{user.discord.id}}</p>
                </b-col>
            </b-row>
        </b-card>
    </b-row>
</template>

<script>
export default {
    props: {
        user: {
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
    width: 80%;
    text-align: left;
    cursor: pointer;
    
    background-color: #2b2f33;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: rgba(255, 255, 255, 0.5);

    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
}
.card:hover{
    color: #fff;
}
.label{
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
}
</style>
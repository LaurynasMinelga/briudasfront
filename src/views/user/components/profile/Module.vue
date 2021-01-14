<template>
    <div class="card">
        <b-row>
            <div class="link" v-on:click="regirectOnClick(modul)">
                <img id="imgLogo" class="card-img" v-bind:src="'img/icons/social/' + checkMedia(modul)[0]+'.svg'" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{checkMedia(modul)[0]}}</h5>
                <p class="card-text">There will be name.. soon</p>
            </div>
        </b-row>
    </div>
</template>

<script>
export default {
    props: {
        modul: {
            type: String,
            default: () => {
                return {};
            }
        }
    },
    data: function(){
        return{
            media: null,
        }
    },
    methods: {
        regirectOnClick(link) {
            location.href=`${link}`;
        },
        checkMedia(link) {
            if (link.match(/instagram/) == 'instagram'){
                return link.match(/instagram/);
            } else
            if (link.match(/facebook/) == 'facebook'){
                return link.match(/facebook/);
            } else
            if (link.match(/twitter/) == 'twitter'){
                return link.match(/twitter/);
            } else
            if (link.match(/spotify/) == 'spotify'){
                return link.match(/spotify/);
            } else
            if (link.match(/youtube/) == 'youtube'){
                return link.match(/youtube/);
            } else
            if (link.match(/reddit/) == 'reddit'){
                return link.match(/reddit/);
            }else
            if (link.match(/steam/) == 'steam'){
                return link.match(/steam/);
            }else
            if (link.match(/blizzard/) == 'blizzard'){
                return link.match(/blizzard/);
            }else
            if (link.match(/origin/) == 'origin'){
                return link.match(/origin/);
            }
        },
        changeLogo(str){
            document.getElementById("imgLogo").src = `img/icons/social/${str}.svg`;
        }
    }, 
    mounted(){
        //this.changeLogo(this.checkMedia(this.modul));
    }
}
</script>

<style scoped>
.link:hover{
    cursor: pointer;
}
.card{
    margin-top: 10px;
    align-items: left;
    background-color: #2b2f33;
}
.card-img{
    width: 124px;
    height: 124px;
    border: 5px solid #2b3553;
    border-bottom-color: transparent;
    background-color: transparent;
    position: relative;
}
</style>

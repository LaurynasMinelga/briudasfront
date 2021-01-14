<template>
    <div class="profile-card">
        <b-row v-if="checkNull(profile.name)">
            <b-col cols="5">
                <label class="label">Full name</label>
            </b-col>
            <b-col cols="6">
                <p class="text">{{profile.name}}</p>
            </b-col>
        </b-row>
        <hr>
        <b-row v-if="checkNull(profile.about)">
            <b-col cols="5">
                <label class="label">About</label>
            </b-col>
            <b-col cols="6">
                <p class="text">{{profile.about}}</p>
            </b-col>
        </b-row>
        <hr>
        <b-row v-if="checkNull(profile.birthday)">
            <b-col cols="5">
                <label class="label">Birthday</label>
            </b-col>
            <b-col cols="6">
                <p class="text">{{profile.birthday}}</p>
            </b-col>
        </b-row>
        <hr>
        <b-row v-if="checkNull(profile.city)">
            <b-col cols="5">
                <label class="label">City</label>
            </b-col>
            <b-col cols="6">
                <p class="text">{{profile.city}}</p>
            </b-col>
        </b-row>
        <hr>
        <b-row v-if="checkNull(profile.languages)">
            <b-col cols="5">
                <label class="label">Languages</label>
            </b-col>
            <b-col cols="6">
                <span>
                    <p class="text">{{profile.languages}}</p>
                </span>
                <!--
                    v-for="language in profile.languages"
                    :key="language"-->
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: {
        user: {
          type: Object,
          default:() =>{
              return{};
          }  
        },
        profile: {
            type: Object,
            default:() => {
                return {};
            }
        }
    },
    methods: {
        checkNull(item) {
            if (typeof item === 'undefined' || item === null){
                return false;
            }
            else return true;
        }
    }
}
</script>

<style scoped>
hr {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.label{
    font-weight:bold;
}
.card {
    padding: 20px 5px 10px 0px;
    background-color: #2b2f33;
    border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
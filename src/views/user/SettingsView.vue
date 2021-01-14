<template>
    <div>
        <b-tabs content-class="mt-3" justified>
        <b-tab title="Management" active>
            <Management :userID="userID"></Management>
        </b-tab>
        <b-tab title="Social">
            <Social :userID="userID"></Social>
        </b-tab>
        <b-tab title="Gaming">
            <Gaming :userID="userID"></Gaming>
        </b-tab>
        <b-tab title="About">
            <About :userID="userID"></About>
        </b-tab>
    </b-tabs>
</div>
</template>

<script>
import About from '@/views/user/components/settings/About.vue'
import Social from '@/views/user/components/settings/Social.vue'
import Gaming from '@/views/user/components/settings/Gaming.vue'
import Management from '@/views/user/components/settings/Management.vue'
export default {
    components: {
        About,
        Social,
        Gaming,
        Management
    },
    data: function(){
        return{
            userID: localStorage.userID,
        }
    }
}
</script>

<style scoped>

</style>
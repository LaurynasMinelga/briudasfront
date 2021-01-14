<template>
    <div class="card">
        <router-link :to="{ name: 'profile', params: { id: user._id}}">
        <img class="card-img-top" src="img/anime6.png" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{user.user.username}}</h5>
          <p class="card-text">Total points: {{user.amount}}</p>
        </div>
        </router-link>
          <span class="card-description">
            Link
          </span>
          <span class="card-description">
            Link
          </span>
          <span class="card-description">
            Link
          </span>
    </div>
</template>
<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {};
        }
      }
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
</style>

<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './views/global/components/NavBar'
export default {
  name: 'App',
  components: {
    'NavBar': NavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #D1D1D1;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #1f2225;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

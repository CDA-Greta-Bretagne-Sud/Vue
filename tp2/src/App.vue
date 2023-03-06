<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <inscription/>
</template>

<script>
import inscription from './components/inscription.vue'

export default {
  name: 'App',
  components: {
    inscription
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

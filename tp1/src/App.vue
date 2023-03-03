<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <exemple-composant/>
  <smp_card  :name="userName" :mailServer="server"></smp_card>
  (parent->data) globalName : <input class="input-sm" type="text" v-model="globalName"> -> {{ globalName }}
  <hr>
  <card :propName="globalName"></card>

</template>

<script>

import exempleComposant from './components/ExempleComposant.vue'
import smp_card from "@/components/Card.vue";
import composantfils from "@/components/Composant2.vue";
export default {
  name: 'App',
  components: {
    exempleComposant,
    smp_card,
    card:composantfils
  },
  data(){ return {
    userName: 'Pascal',
    server: 'gmail.com',
    globalName: 'pascal'
  }},

}
</script>

<style>
#app ,
    ExempleComposant{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

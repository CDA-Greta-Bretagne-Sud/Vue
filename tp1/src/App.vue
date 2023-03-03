<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <exemple-composant/>
  <smp_card  :name="userName" :mailServer="server"></smp_card>
  (parent->data) globalName : <input class="input-sm" type="text" v-model="globalName"> -> {{ globalName }}
  <hr>
  <card :propName="globalName"></card>
<hr>
   <text-form @update:text="updateText"></text-form>

  <hr>
  Texte validé reçu du composant: {{ text }}
  <hr>
 <post-it bg="lightpink">
    Prochaine souternance à rendre à la fin du mois! <!-- contenu inséré dans le template du composant -->
  </post-it>

  <post-it bg="yellow">

    <!-- contenu inséré dans le template du composant -->
    <h4>Courses :</h4>
    <ul>
      <li>poulet</li>
      <li>maroilles</li>
      <li>crème fraiche</li>
      <li>frites au four</li>
    </ul>

  </post-it>

  <post-it bg="lightblue">
    Anniversaire de brigitte <!-- contenu inséré dans le template du composant -->
  </post-it>

</template>

<script>

import exempleComposant from './components/ExempleComposant.vue'
import smp_card from "@/components/Card.vue";
import composantfils from "@/components/Composant2.vue";
import composantext from "@/components/Composant3.vue";
import PostIt from "@/components/PostIt.vue";
export default {
  name: 'App',
  components: {
    exempleComposant,
    smp_card,
    card:composantfils,
    TextForm: composantext,
    PostIt
  },
  data(){ return {
    userName: 'Pascal',
    server: 'gmail.com',
    globalName: 'pascal',
    text: ''
  }},
    methods:{
    updateText(txt){
      this.text = txt
    }
  }

  

}
</script>

<style>
#app {
  margin: 5px;
  }
  .post-it{
    margin: 5px;
  }
    ExempleComposant{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

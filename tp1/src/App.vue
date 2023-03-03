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
<!-- vuetify-->
<input type="text" v-model="txt" placeholder="Tapez notre nom">
  <v-card
    class="mx-auto"
    max-width="344"
  >
  <v-card-title>
  <p class="text-h4 text--primary" >
        {{ txt.toUpperCase() }}
      </p>
  </v-card-title>
    <v-card-subtitle>
 <p v-show='txt'>Nom : {{ txt.toUpperCase() }}</p>
      </v-card-subtitle>
    <v-card-text v-show='txt'>  

      Email: {{ txt.toLowerCase() }}@gmail.com

    </v-card-text>
    <v-card-item v-show='txt'>
      Fiche de {{ txt.toLowerCase() }}
    </v-card-item>
  </v-card>
<hr>

<v-btn> Button </v-btn>
<v-btn color="primary"> Button </v-btn>
<v-btn color="secondary"> Button </v-btn>
<v-btn color="error"> Button </v-btn>
<v-btn color="warning"> Button </v-btn>
<v-btn color="success"> Button </v-btn>
<v-btn color="black"> Button </v-btn>
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
    text: '',
     txt: ''
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

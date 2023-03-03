<template>
  <div>
    <label>(fils->props) propName</label> :
    <input class="input-sm" type="text" :value="propName">->
    {{ propName }}

    <br>

    <label>(fils->data) localName</label> :
    <input class="input-sm" type="text" v-model="copie">->
   {{ copie }}
  </div>
</template>

<script>
export default {
  name: "composant-fils",
  props:{ // <------------ déclaration des paramètres ---------------------------
    propName: String// le type n'est pas obligatoire, mais c'est mieux de le mettre
  },
  data(){return {
   // localName: this.propName
  }},
   computed: {
     
        copie(){
           return this.propName;
        }
    }

}
</script>

<style scoped>
.mdl-card{
  min-height: 70px ;
}
</style>

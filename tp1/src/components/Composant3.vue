<template>
<div class="text-form" style="display: flex">

  <input class="form-control" v-model="textInput" placeholder="Entrez votre texte">
  <div style="width: 1em"></div>
  <button @click="validate" class="btn btn-primary">
    Valider
  </button>

</div>
</template>

<script>

export default {
   name: "composant-evt",
  data(){ return {
    textInput: ''
  }},
  methods:{
    validate(){
      this.$emit('update:text', this.textInput)
    }
  }
}
</script>
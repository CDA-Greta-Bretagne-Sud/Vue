<template>
<div id="couleur-comp" class="carre" :style="{ background: color}">
    Carre : {{ $route.params.name }}
</div>
</template>

<script>
    export default {
        name: "couLeur",
        data(){return{
        color: this.$route.params.name // récupération du paramètre pour changer la couleur
  }},
  watch: {
    '$route' (to, from){ // il faut mettre un watcher au cas où le paramètre de la couleur change...
      console.log(from)
      this.color = to.params.name
    }
  }
}
</script>

<style scoped>
  @import "../css/carre.css";
</style>
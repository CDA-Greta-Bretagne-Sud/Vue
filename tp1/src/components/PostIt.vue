<template>
<div>

  <div class="mdl-card mdl-shadow--3dp post-it" :style="'background: '+ bg">
    <slot>
      <!-- on trouvera ici le contenu de la balise -->
    </slot>
  </div>

</div>
</template>

<script>
export default {
  name: "PostIt",
  props:{
    bg: String
  }
}
</script>

<style scoped>
.post-it{
  width: 200px;
  height: 200px;

  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

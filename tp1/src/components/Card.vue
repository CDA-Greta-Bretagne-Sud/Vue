<template>
<div>
    <div class="mdl-card mdl-shadow--3dp"
         style="background: linear-gradient(45deg, #ffffff, #607D8B) ; margin: 10px 0">
      <div class="mdl-card__title mdl-card--expand">
        <div v-show="name != ''">
          <h4>
            {{ name }}
          </h4>
          <h3>
            <p>Mail : {{name}}@{{ mailServer }} </p>
          </h3>
        </div>
      </div>
    </div>
</div>
</template>
<script>
export default{
  name: "smp_card",
  props:{ // <------------ déclaration des paramètres ---------------------------
    name: String, // le type n'est pas obligatoire, mais c'est mieux de le mettre
    mailServer: String,
  }
}

</script>

<style scoped>
.mdl-card{
  min-height: 70px ;
}
</style>

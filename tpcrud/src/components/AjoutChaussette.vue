<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Titre</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="chaussette.titre"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="chaussette.description"
          name="description"
        />
      </div>

      <button @click="savechaussette" class="btn btn-success">Ajouter</button>
    </div>

    <div v-else>
      <h4>Ajout effectué avec succes!</h4>
      <button class="btn btn-success" @click="newchaussette">Add</button>
    </div>
  </div>
</template>

<script>
import ChaussetteDataService from "../services/ChaussetteDataService";

export default {
  name: "ajout-chaussette",
  data() {
    return {
      chaussette: {
        id: null,
        titre: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    savechaussette() {
      var data = {
        titre: this.chaussette.titre,
        description: this.chaussette.description
      };

      ChaussetteDataService.create(data)
        .then(response => {
          this.chaussette.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newchaussette() {
      this.submitted = false;
      this.chaussette = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

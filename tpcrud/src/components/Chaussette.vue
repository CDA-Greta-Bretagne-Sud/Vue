<template>
  <div v-if="currentChaussette" class="edit-form">
    <h4>Chaussette</h4>
    <form>
      <div class="form-group">
        <label for="titre">Titre</label>
        <input type="text" class="form-control" id="titre"
          v-model="currentChaussette.titre"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentChaussette.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentChaussette.published ? "Publié" : "En attente" }}
      </div>
    </form>

    <button class="btn btn-primary mr-2"
      v-if="currentChaussette.published"
      @click="updatePublished(false)"
    >
      Non publié
    </button>
    <button v-else class="btn btn-secondary mr-2"
      @click="updatePublished(true)"
    >
      Publié
    </button>

    <button class="btn btn-danger mr-2"
      @click="deleteChaussette"
    >
      SUpprimer
    </button>

    <button type="submit" class="btn btn-success"
      @click="updateChaussette"
    >
      Mettre à jour
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>SVP cliquez sur une Chaussette...</p>
  </div>
</template>

<script>
import ChaussetteDataService from "../services/ChaussetteDataService";

export default {
  name: "ChausseTte",
  data() {
    return {
      currentChaussette: null,
      message: ''
    };
  },
  methods: {
    getChaussette(id) {
      ChaussetteDataService.get(id)
        .then(response => {
          this.currentChaussette = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentChaussette.id,
        title: this.currentChaussette.titre,
        description: this.currentChaussette.description,
        published: status
      };

      ChaussetteDataService.update(this.currentChaussette.id, data)
        .then(response => {
          console.log(response.data);
          this.currentChaussette.published = status;
          this.message = 'Le status a été mis à jour!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateChaussette() {
      ChaussetteDataService.update(this.currentChaussette.id, this.currentChaussette)
        .then(response => {
          console.log(response.data);
          this.message = 'Les chaussettes sont mises à jour!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteChaussette() {
      ChaussetteDataService.delete(this.currentChaussette.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Chaussettes" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getChaussette(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

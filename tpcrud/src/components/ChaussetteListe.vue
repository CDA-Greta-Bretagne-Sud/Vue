<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Rechercher par titre"
          v-model="titre"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchtitre"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Liste de Chaussettes </h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(Chaussette, index) in Chaussettes"
          :key="index"
          @click="setActiveChaussette(Chaussette, index)"
        >
          {{ Chaussette.titre }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllChaussettes">
        Supprimer tout
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentChaussette">
        <h4>Chaussette</h4>
        <div>
          <label><strong>titre:</strong></label> {{ currentChaussette.titre }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentChaussette.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentChaussette.published ? "Publié" : "En attente" }}
        </div>

        <router-link :to="'/Chaussette/' + currentChaussette.id" class="btn btn-warning">Editer</router-link>
      </div>
      <div v-else>
        <br />
        <p>Ciquez sur un chaussette...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ChaussetteDataService from "../services/ChaussetteDataService";

export default {
  name: "Chaussettes-liste",
  data() {
    return {
      Chaussettes: [],
      currentChaussette: null,
      currentIndex: -1,
      titre: ""
    };
  },
  methods: {
    retrieveChaussettes() {
      ChaussetteDataService.getAll()
        .then(response => {
          this.Chaussettes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveChaussettes();
      this.currentChaussette = null;
      this.currentIndex = -1;
    },

    setActiveChaussette(Chaussette, index) {
      this.currentChaussette = Chaussette;
      this.currentIndex = Chaussette ? index : -1;
    },

    removeAllChaussettes() {
      ChaussetteDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchtitre() {
      ChaussetteDataService.findByTitre(this.titre)
        .then(response => {
          this.Chaussettes = response.data;
          this.setActiveChaussette(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveChaussettes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

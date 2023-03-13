import http from "../http-common";

class ChaussetteDataService {
  getAll() {
    return http.get("/chaussette");
  }

  get(id) {
    return http.get(`/chaussette/${id}`);
  }

  create(data) {
    return http.post("/chaussette", data);
  }

  update(id, data) {
    return http.put(`/chaussette/${id}`, data);
  }

  delete(id) {
    return http.delete(`/chaussette/${id}`);
  }

  deleteAll() {
    return http.delete(`/chaussette`);
  }

  findByTitre(titre) {
    return http.get(`/chaussette?titre=${titre}`);
  }
}

export default new ChaussetteDataService();
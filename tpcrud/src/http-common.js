import axios from "axios";

export default axios.create({
  baseURL: "http://back.greta-bretagne-sud.fr/api",
  headers: {
    "Content-type": "application/json"
  }
});


      const chaussettes = require("../controllers/chaussette.controller.js");

      module.exports = function(app) {
        app.use(function(req, res, next) {
          res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
        });
  
    // Creation d'une nouvelle chaussette
   app.post("/api/chaussette", chaussettes.create);
  
    // Recupération de toutes les  chaussettes
   app.get("/api/chaussette", chaussettes.findAll);
  
    // Recupération de toutes les  chaussettes publiées
   app.get("/api/chaussette/published", chaussettes.findAllPublished);
  
    // Récupération de la chaussette par son ld
   app.get("/api/chaussette/:id", chaussettes.findOne);
  
    // Mise a jour de la chaussette par son id
   app.put("/api/chaussette/:id", chaussettes.update);
  
    // suppression de la  chaussette par son id
   app.delete("/api/chaussette/:id", chaussettes.delete);
  
    // suppression de toutes les  chaussettes
   app.delete("/api/chaussette/", chaussettes.deleteAll);

  };
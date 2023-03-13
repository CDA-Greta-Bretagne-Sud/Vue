const db = require("../models");
const Chaussette = db.chaussette;
const Op = db.Sequelize.Op;

// Creer et sauvegarde une nouvelle Chaussette
exports.create = (req, res) => {
   // Validation de la requete
   if (!req.body.titre) {
    res.status(400).send({
      message: "Le titre ne peux pas être vide!"
    });
    return;
  }
  // Creation d'une  Chaussette
  const chaussette = {
    titre: req.body.titre,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Sauvegarde de la  Chaussette en bdd
  Chaussette.create(chaussette)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur lors de la création des chaussettes."
      });
    });
};

// Recupération de toutesz les  Chaussettes de la database.
exports.findAll = (req, res) => {
    const titre = req.query.titre;
    var condition = titre ? { titre: { [Op.like]: `%${titre}%` } } : null;
  
   Chaussette.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur lors de la création des chaussettes."
        });
      });
  };


// trouve un Chaussette par son id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Chaussette.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Impossible de trouver la  Chaussette avec id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur de récupération de la  Chaussette avec id=" + id
        });
      });
};

// Mise a jour d'une  Chaussette par son id 
exports.update = (req, res) => {
    const id = req.params.id;

    Chaussette.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Chaussette a été mise à jour."
          });
        } else {
          res.send({
            message: `Impossible de mettre à jou  Chaussette avec id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la mise à jour de Chaussette avec id=" + id
        });
      });
};

// suppression de la  Chaussette wpar son id
exports.delete = (req, res) => {
    const id = req.params.id;

    Chaussette.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Chaussette supprimer avec succes!"
          });
        } else {
          res.send({
            message: "suppression impossible de la chaussette id="+id
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Chaussette ne peut pas êtr supprimé avec id=" + id
        });
      });
  };


// suppression de toutes les Chaussettes de la database.
exports.deleteAll = (req, res) => {
    Chaussette.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Chaussettes supprimés avec succes!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite pendant la suppression des  Chaussettes."
          });
        });
};

// Récupération de toutes les Chaussettes
exports.findAllPublished = (req, res) => {
    Chaussette.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des  Chaussettes."
      });
    });
};
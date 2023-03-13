module.exports = (sequelize, Sequelize) => {
    const Chaussette = sequelize.define("chaussette", {
      titre: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Chaussette;
  };
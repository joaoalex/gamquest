module.exports = app => {
  const quests = require("../controllers/quest.controller.js");

  var router = require("express").Router();
  const path = require('path');

  // Create a new 
  //router.post("/insert", quests.updatesheets);
  router.post("/insert", quests.create);

  // Retrieve all 
  router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/angular-starter', 'index.html'));
  });
  // Retrieve all 
  router.get("/teams", quests.findAll );

  // Retrieve all users 
  router.get("/users", quests.getusers );

  // Retrieve all active teams 
  router.get("/teams/active", quests.findAllActive);

  // Retrieve a single  with id
  router.get("/teams/:id", quests.findOne);

   // Retrieve all Roles 
   router.get("/roles/:id", quests.findRolesByteam);
 
  // Retrieve vetores 
  router.get("/vetores/:team", quests.findVetoresByteam);
  // Retrieve respostas
  router.get("/respostas/:team", quests.findRespostasByteam);

  // Retrieve
  router.get("/name/:name", quests.findOneByname);

  // Update with id
  router.put("/:id", quests.update);

  // Delete with id
  router.delete("/:id", quests.delete);

  // Delete all
  //router.delete("/", quests.deleteAll);
  
  app.use('/api', router);
};


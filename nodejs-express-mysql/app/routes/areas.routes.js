module.exports = app => {
  const areas = require("../controllers/areas.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", areas.create);

  // Retrieve all Tutorials
  router.get("/", areas.findAll);

  // Retrieve all published Tutorials
  router.get("/published", areas.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", areas.findOne);

  // Update a Tutorial with id
  router.put("/:id", areas.update);

  // Delete a Tutorial with id
  router.delete("/:id", areas.delete);

  // Delete all Tutorials
  router.delete("/", areas.deleteAll);

  app.use('/api/areas', router);
};

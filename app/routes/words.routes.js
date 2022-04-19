module.exports = app => {
    const words = require("../controllers/word.controller.js");
  
    var router = require("express").Router();
  
    // Create a new word
    router.post("/", words.create);
  
    // Retrieve all word
    router.get("/", words.findAll);
  
    // Retrieve all published word
    router.get("/published", words.findAllPublished);
  
    // Retrieve a single word with id
    router.get("/:id", words.findOne);
  
    // Update a word with id
    router.put("/:id", words.update);
  
    // Delete a word with id
    router.delete("/:id", words.delete);
  
    // Create a new word
    router.delete("/", words.deleteAll);
  
    app.use("/api/project-anagram/words", router);
  };
  
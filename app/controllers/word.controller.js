const db = require("../models");
const Word = db.words;

// Create and Save a new word
exports.create = (req, res) => {
  // Validate request
  if (!req.body.easy) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a word
  const word = new Word({
      easy: req.body.easy,
      medium: req.body.medium,
      hard: req.body.hard,
  });

  // Save words in the database
  word
    .save(word)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the word."
      });
    });
};

// Retrieve all words from the database.
exports.findAll = (req, res) => {
  const easy = req.query.easy;
  var condition = easy ? { easy: { $regex: new RegExp(easy), $options: "i" } } : {};

  Word.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving words."
      });
    });
};

// Find a single word with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Word.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found word with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving word with id=" + id });
    });
};

// Update a word by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Word.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update words with id=${id}. Maybe words was not found!`
        });
      } else res.send({ message: "word was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating word with id=" + id
      });
    });
};

// Delete a word with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Word.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete words with id=${id}. Maybe words was not found!`
        });
      } else {
        res.send({
          message: "word was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete word with id=" + id
      });
    });
};

// Delete all words from the database.
exports.deleteAll = (req, res) => {
  Word.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} word were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all words."
      });
    });
};

// Find all published words
exports.findAllPublished = (req, res) => {
  Word.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL;//dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.words = require("./word.model.js")(mongoose);
module.exports = db;

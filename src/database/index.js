const connection = require("../config/databaseConfig");

const User = require("../models/User");
const Task = require("../models/Task");

const models = [User, Task];

connection
  .authenticate()
  .then(() => {
    console.log("Successfully connected with database.");
    models.forEach((model) => connection.sync({ force: true }));
    console.log(`All tables were created`);
  })
  .catch((e) => console.log(e));

module.exports = connection;

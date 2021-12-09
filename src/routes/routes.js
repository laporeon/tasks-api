const { Router } = require("express");

const routes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");

routes.get("/", UserController.list);
routes.post("/", UserController.create);
routes.delete("/:id", UserController.delete);

routes.get("/tasks", ensureAuthenticated, TaskController.list);
routes.post("/tasks", TaskController.create);

module.exports = routes;

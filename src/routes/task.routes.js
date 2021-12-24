const { Router } = require("express");

const taskRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const TaskController = require("../controllers/TaskController");

taskRoutes.get("/", TaskController.list);
taskRoutes.post("/", TaskController.create);
taskRoutes.patch("/:id", TaskController.update);
taskRoutes.delete("/:id", TaskController.delete);

module.exports = taskRoutes;

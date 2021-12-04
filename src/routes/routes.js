const { Router } = require("express");

const routes = Router();

const UserController = require("../controllers/UserController");

routes.get("/", UserController.list);
routes.post("/", UserController.create);

module.exports = routes;

const { Router } = require("express");

const userRoutes = Router();

const UserController = require("../controllers/UserController");

userRoutes.get("/", UserController.list);
userRoutes.post("/", UserController.create);
userRoutes.delete("/:id", UserController.delete);

module.exports = userRoutes;

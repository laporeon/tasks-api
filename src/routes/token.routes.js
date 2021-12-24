const { Router } = require("express");

const tokenRoutes = Router();

const TokenController = require("../controllers/TokenController");

tokenRoutes.post("/", TokenController.store);

module.exports = tokenRoutes;

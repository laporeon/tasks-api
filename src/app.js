require("dotenv").config();
require("./database");

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 3000;

const swaggerFile = require("../swagger.json");

const ensureAuthenticated = require("./middlewares/ensureAuthenticated");

const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");
const tokenRoutes = require("./routes/token.routes");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/user", userRoutes);
app.use("/tasks", ensureAuthenticated, taskRoutes);
app.use("/auth", tokenRoutes);

module.exports = { app, port };

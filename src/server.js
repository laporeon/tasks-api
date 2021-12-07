require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes/routes");
const connection = require("./database/databaseConfig");

const app = express();
const port = process.env.PORT || 3000;

const swaggerFile = require("../swagger.json");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/", routes);

connection
  .authenticate()
  .then(() => {
    console.log("Successfully connected with database.");
    app.emit("db-connected");
  })
  .catch((e) => console.log(e));

app.on("db-connected", () => {
  app.listen(port, () => {
    console.log(`Server is running on port - ${port}`);
  });
});

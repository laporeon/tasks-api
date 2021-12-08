require("dotenv").config();
require("./database");

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes/routes");

const app = express();
const port = process.env.PORT || 3000;

const swaggerFile = require("../swagger.json");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port - ${port}`);
});

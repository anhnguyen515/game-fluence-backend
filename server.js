require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
const { PORT, DATABASE_URL, CORS_DOMAIN } = require("./utils/constants");

mongoose.connect(DATABASE_URL);
const database = mongoose.connection;

database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(
  cors({
    origin: CORS_DOMAIN,
  })
);
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

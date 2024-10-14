const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const sequelize = require("./config/database");
const app = express();

const port = 8000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

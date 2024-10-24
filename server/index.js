const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const sequelize = require("./config/database");
const User = require("./src/models/user");
const Attendee = require("./src/models/attendee");
const Event = require("./src/models/event");

const app = express();

const port = 8000;

app.use(bodyParser.json());

const models = {
  User,
  Event,
  Attendee,
};

// Set up associations
User.associate(models);
Event.associate(models);
Attendee.associate(models);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

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

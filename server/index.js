const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 8000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "event_planner_db",
  port: 8111,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }

  console.log("Connected to MySQL as ID " + db.threadId);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

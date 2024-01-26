const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const todoRouter = require("./routes/todoRoute");
const connection = require("./conn/conn");

app.use(bodyParser.json());
app.use(express.json());
app.use("/api/", auth);
app.use("/todo/", todoRouter);
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.listen(1000, () => {
  console.log("server running...");
});

// index.js is used for setting up backend server that will listen for incoming requests and send responses
// we wil also be conecting routes to the server here
require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json())

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is up and running");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

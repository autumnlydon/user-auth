// index.js is used for setting up backend server that will listen for incoming requests and send responses
// we wil also be conecting routes to the server here

const express = require("express");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server is up and running");
});

app.get("/yerr", (req, res) => {
    res.send("Yerrrrr");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

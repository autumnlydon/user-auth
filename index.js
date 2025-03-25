// index.js is used for setting up backend server that will listen for incoming requests and send responses
// we wil also be conecting routes to the server here
require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json())

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is up and running");
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
  });
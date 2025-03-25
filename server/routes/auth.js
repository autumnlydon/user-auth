// create + manage authentication routes here

const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", verifyToken, (req, res) => {
    res.json({
        message: "Welcome to your profile",
        user: req.user,
    })
})

router.get("/dashboard", verifyToken, (req, res) => {
    res.json({
        message: `Welcome to your Dashboard, ${req.user.email}!`,
    })
})

module.exports = router;
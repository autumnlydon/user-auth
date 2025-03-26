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
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        message: `Welcome to your Dashboard, ${req.user.firstName} ${req.user.lastName}!`,
    })
})

module.exports = router;
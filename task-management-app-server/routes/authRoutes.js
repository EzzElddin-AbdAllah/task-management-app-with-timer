const express = require("express");
const {
	loginUser,
	registerUser,
	verifyToken,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verify", verifyToken);

module.exports = router;

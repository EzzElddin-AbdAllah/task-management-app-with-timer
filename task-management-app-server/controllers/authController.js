const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ userId: user._id, username: user.username },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		res.json({ username, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const registerUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		const existingUser = await User.findOne({ username });

		if (existingUser) {
			return res.status(400).json({ error: "Username is already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({ username, password: hashedPassword });

		const token = jwt.sign(
			{ userId: newUser._id, username: newUser.username },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		res.json({ username, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const verifyToken = async (req, res) => {
	const { token } = req.body;

	if (!token) {
		return res.status(401).json({ error: "Token is missing" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		res.json({ username: decoded.username, token });
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Invalid token" });
	}
};

module.exports = { loginUser, registerUser, verifyToken };

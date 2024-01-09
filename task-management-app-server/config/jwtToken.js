const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).json({ error: "Token is missing" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = {
			userId: decoded.userId,
			username: decoded.username,
		};
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Invalid token" });
	}
};

module.exports = verifyToken;

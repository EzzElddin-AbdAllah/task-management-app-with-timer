require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const verifyToken = require("./config/jwtToken");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use(verifyToken);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

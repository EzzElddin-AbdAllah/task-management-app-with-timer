const express = require("express");
const {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
	startTracking,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.post("/:taskId/start-tracking", startTracking);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;

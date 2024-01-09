const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const pageSize = 8;
		const skip = (page - 1) * pageSize;
		const searchTerm = req.query.searchTerm || "";

		const totalCount = await Task.countDocuments({
			title: { $regex: searchTerm, $options: "i" },
		});

		const tasks = await Task.find({
			title: { $regex: searchTerm, $options: "i" },
		})
			.skip(skip)
			.limit(pageSize);

		res.json({ tasks, totalCount });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const createTask = async (req, res) => {
	try {
		const { title, status } = req.body;

		if (!title) {
			return res.status(400).json({ error: "Title is required" });
		}

		if (!["Open", "Closed", "In Progress"].includes(status)) {
			return res.status(400).json({ error: "Invalid status" });
		}

		const existingTask = await Task.findOne({ title });
		if (existingTask) {
			return res
				.status(400)
				.json({ error: "A task with the same title already exists" });
		}

		const newTask = await Task.create({
			title,
			status,
			timeSpent: "00:00:00",
			createdBy: req.user.username,
		});

		res.json({ task: newTask });
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Invalid token" });
	}
};

const updateTask = async (req, res) => {
	try {
		const { title, status, timeSpent } = req.body;

		if (!title) {
			return res.status(400).json({ error: "Title is required" });
		}

		if (!["Open", "Closed", "In Progress"].includes(status)) {
			return res.status(400).json({ error: "Invalid status" });
		}

		const taskId = req.params.taskId;
		const existingTask = await Task.findById(taskId);

		if (!existingTask) {
			return res.status(404).json({ error: "Task not found" });
		}

		if (existingTask.createdBy !== req.user.username) {
			return res
				.status(403)
				.json({ error: "You are not authorized to update this task" });
		}

		if (
			title !== undefined &&
			(await Task.findOne({ title, _id: { $ne: existingTask._id } }))
		) {
			return res
				.status(400)
				.json({ error: "A task with the same title already exists" });
		}

		if (title !== undefined) {
			existingTask.title = title;
		}

		if (status !== undefined) {
			existingTask.status = status;
		}

		if (timeSpent !== undefined) {
			existingTask.timeSpent = timeSpent;
		}

		await existingTask.save();

		res.json({ task: existingTask });
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Invalid token" });
	}
};

const deleteTask = async (req, res) => {
	try {
		const taskId = req.params.taskId;
		const existingTask = await Task.findById(taskId);

		if (!existingTask) {
			return res.status(404).json({ error: "Task not found" });
		}

		if (existingTask.createdBy !== req.user.username) {
			return res
				.status(403)
				.json({ error: "You are not authorized to delete this task" });
		}

		await existingTask.deleteOne();

		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Invalid token" });
	}
};

const startTracking = async (req, res) => {
	try {
		const taskId = req.params.taskId;
		const existingTask = await Task.findById(taskId);

		if (!existingTask) {
			return res.status(404).json({ error: "Task not found" });
		}

		if (existingTask.createdBy !== req.user.username) {
			return res.status(403).json({
				error: "You are not authorized to start/stop tracking this task",
			});
		}

		// Stop tracking for all other tasks by the same user
		await Task.updateMany(
			{ createdBy: req.user.username, _id: { $ne: existingTask._id } },
			{ $set: { startTime: null } }
		);

		// Toggle tracking by updating the startTime field
		if (existingTask.startTime) {
			// If already tracking, stop tracking
			const currentTime = new Date();
			const elapsedTimeInSeconds = Math.floor(
				(currentTime - existingTask.startTime) / 1000
			);

			const newTimeSpentInSeconds =
				parseInt(existingTask.timeSpent.split(":")[0]) * 3600 +
				parseInt(existingTask.timeSpent.split(":")[1]) * 60 +
				parseInt(existingTask.timeSpent.split(":")[2]) +
				elapsedTimeInSeconds;

			const hours = Math.floor(newTimeSpentInSeconds / 3600);
			const minutes = Math.floor((newTimeSpentInSeconds % 3600) / 60);
			const seconds = newTimeSpentInSeconds % 60;

			existingTask.timeSpent = `${hours.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
			existingTask.startTime = null;

			res.json({ message: "Task tracking stopped successfully" });
		} else {
			// If not tracking, start tracking
			existingTask.startTime = new Date();
			res.json({ message: "Task tracking started successfully" });
		}

		await existingTask.save();
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Invalid token" });
	}
};

module.exports = {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
	startTracking,
};

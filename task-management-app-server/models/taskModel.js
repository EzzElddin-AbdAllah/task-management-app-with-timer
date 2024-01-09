const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: String,
	status: String,
	timeSpent: String,
	createdBy: String,
	startTime: {
		type: Date,
		default: null,
	},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

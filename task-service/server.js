const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Task = require('./models/Task');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('task-service is running!'));

// Create Task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

// Get all Tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`task-service running on port ${PORT}`));

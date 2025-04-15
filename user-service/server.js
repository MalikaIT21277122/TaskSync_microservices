const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('user-service is running!'));

// Create User
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// Get all Users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`user-service running on port ${PORT}`));

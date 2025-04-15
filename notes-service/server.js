const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Note = require('./models/Note');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('notes-service is running!'));

// Create Note
app.post('/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.send(note);
});

// Get all Notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`notes-service running on port ${PORT}`));

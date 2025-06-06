const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  content: String,
  taskId: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', NoteSchema);

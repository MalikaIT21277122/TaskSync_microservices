const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  assignedUserId: String,
  status: { 
    type: String, 
    default: 'pending' 
  }
});
module.exports = mongoose.model('Task', TaskSchema);

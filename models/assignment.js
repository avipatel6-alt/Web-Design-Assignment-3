const mongoose = require('mongoose');

// variables for every assignment, basically the arraylist
const assignmentSchema = new mongoose.Schema({
  title:   { type: String, required: true }, 
  course:  { type: String, required: true },
  dueDate: { type: Date,   required: true } //check ts if it shows up as date format or not
});

module.exports = mongoose.model('Assignment', assignmentSchema);
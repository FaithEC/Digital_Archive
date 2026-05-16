const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true }, // Path to the file
  department: { 
    type: String, 
    required: true,
    enum: ['Computer Science', 'Software Engineering', 'Cyber Security', 'Information Technology']
  },
  level: { type: String, required: true },
  year: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Material', materialSchema);

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
 title: {
      type: String,
      required: true
    },
    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    dueDate: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    }
})

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema)
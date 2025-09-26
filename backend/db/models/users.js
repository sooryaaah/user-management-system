const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstLogin : {
        type: Boolean,
        default: true
    },
    attendance: [
        {
            present: {
                type: Boolean,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    tasks: [
        {
            task: {
                type: String
            },
            start: {
                type: Boolean
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
    permission: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

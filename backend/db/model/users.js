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
    position: {
        type: String
    },
    department: {
        type: String
    },
    joinDate: {
        type: Date
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    attendance: [
        {
            present: {
                type: Boolean,

            },
            date: {
                type: Date,

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
    },

    userType: {
        type: String,
        required: true,
        enum: ["admin", "employee", "manager", "ceo"]
    },

    images: {
        type : String,
        
    }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

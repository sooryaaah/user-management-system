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
        secure_url : {
            type : String,

        },
        publicId: {
            type: String
        }

        
    }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

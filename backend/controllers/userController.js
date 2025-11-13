const User = require("../db/model/users");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { send } = require("process");
const sendEmail = require('../utils/sendEmail').sendEmail
const passwordTemplate = require('../utils/email templates/passwordTemplate').passwordTemplate
const jwt = require('jsonwebtoken');
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
const { log } = require("console");
const cloudinary = require('../db/cloudinary')
const Task = require('../db/model/tasks')

exports.addUser = async (req, res) => {
    try {
        const { name, email, position, department, joinDate } = req.body;

        if (!name || !email) {
            return res.status(400).send({
                success: false,
                message: "Name and email are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already exists"
            });
        }

        const plainPassword = crypto.randomBytes(6).toString('base64');
        console.log('plain password:', plainPassword)

        // let subject = "Company Account Authentication"
        // let html = await passwordTemplate(name, plainPassword)


        // let sendmail = await sendEmail(email, subject, html);
        // console.log(sendmail)

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        let newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType: "employee",
            position,
            department,
            joinDate
        });

        if (req.file) {
            console.log('req.file: ', req.file)
            const result = await uploadToCloudinary(req.file.buffer, "images")
            console.log('result ', result);

            newUser.images.secure_url = result.secure_url
            newUser.images.publicId = result.public_id


        }

        const addUser = await User.create(newUser);

        return res.status(200).send({
            success: true,
            message: "User created successfully"
        })



    } catch (error) {
        console.error('Error while signing up:', error);
        return res.status(500).send({
            success: false,
            message: error.message || "Server error"
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const allUsers = await User.find()

        return res.status(200).send({
            success: true,
            message: 'fetched users successfully',
            data: allUsers
        })

    } catch (error) {
        console.log('error while fetching users:', error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const params = req.params.id

        const userData = await User.findOne({ _id: params })
        const publicId = userData.images.publicId

        cloudinary.uploader.destroy(publicId, { resource_type: 'image' })
            .then(result => console.log(result))
            .catch(err => console.log(err))



        const deleteUser = await User.deleteOne({ _id: params })





        if (deleteUser) {
            return res.status(200).send({
                success: true,
                message: 'successfully removed user'
            })
        }



    } catch (error) {
        console.log("error in deleteUser : ", error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id

        const deleteTask = await Task.findByIdAndDelete(id)
        if (!deleteTask) {
            return res.status(400).send({
                success: false,
                message: " task not found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "task successfully removed"
        })

    } catch (error) {
        console.log("error in delete task", error);
        return res.status(400).send({
            success: false,
            message: error.message || error
        })

    }
}

exports.addTask = async (req, res) => {
    try {
        const { title, assignedTo, dueDate, description } = req.body;

        if (!title || !assignedTo || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, assigned user and due date"
            });
        }

        const newTask = await Task.create({
            title,
            assignedTo,
            dueDate,
            description,
        });

        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            data: newTask
        });

    } catch (error) {
        console.log("Error in addTask:", error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("assignedTo", "name email")  // shows employee name instead of only id
            .sort({ createdAt: -1 }); // newest first

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
        });

    } catch (error) {
        console.log("Error getting tasks:", error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getTask = async (req, res) => {
    try {
        const id = req.params.id
        console.log('id: ', req.params.id);


        if (!id) {
            return res.status(400).send({
                success: false,
                message: "id not found"
            }
            )
        }

        const task = await Task.find({ assignedTo: id })


        return res.status(200).send({
            success: true,
            message: "fetched user successfulyy",
            data: task
        })
    } catch (error) {
        console.log("error in getTask: ", error);
        return res.status(400).send({
            success: false,
            message: error.message
        })

    }
}

exports.taskStatus = async (req, res) => {
    try {
        const { taskId } = req.params
        const { status } = req.body



        if (!taskId) {
            return res.status(400).send({
                success: false,
                message: "task id not found"
            })
        }

        if (!status) {
            return res.status(400).send({
                success: false,
                message: "status not updated"
            })
        }

        const allowedStatus = ["Pending", "In progress", "Completed"]

        if (!allowedStatus.includes(status)) {
            return res.status(400).send({
                success: false,
                message: "invalid status"
            })
        }

        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true }).populate("assignedTo", "name email")

        if (!task) {
            return res.status(400).send({
                success: false,
                message: "task not found"
            })
        }

        return res.status(200).send({
            success: true,
            data: {
                id: task._id,
                title: task.title,
                status: task.status,
                assignedTo: task.assignedTo

            }
        })
    } catch (error) {
        console.log("error in taskStatus: ", error)
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'id not found'
            })
        }

        const user = await User.findById(id)
        console.log("user: ", user);


        return res.status(200).send({
            success: true,
            message: 'fetched user successfully',
            data: user
        })

    } catch (error) {
        console.log('error in getUser:', error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}


exports.editUser = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email, position, department } = req.body

        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'id not found'
            })
        }

        let updateData = {
            name,
            email,
            position,
            department
        }

      
        if (req.file) {
            console.log("req.file: ", req.file);

            const uploadedImg = await uploadToCloudinary(req.file.buffer)
            updateData.images = {
                secure_url: uploadedImg.secure_url,
                publicId: uploadedImg.public_id
            };
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true })
        console.log("user in editUser :", user)

        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'user not found'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'user updated successfully'

        })


    } catch (error) {
        console.log('error in editUser :', error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}


exports.markAttendance = async (req, res) => {
    try {
        const { userId } = req.params;
        const { present, date } = req.body;  // true / false

        console.log("present:", req.body.present);

        const today = new Date(date)
        const dateOnly = today.toISOString().split('T')[0]

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });



        // Check if today's attendance already exists
        const existing = user.attendance.find(
            (entry) => entry.date.toISOString().split('T')[0] === dateOnly
        );

        if (existing) {
            existing.present = present; // Update existing

        } else {
            user.attendance.push({
                date: today,
                present
            });
        }

        await user.save();
        // console.log("user:", user);


        res.json({ message: "Attendance marked successfully", attendance: user.attendance });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const { date } = req.params; // "2025-02-01"

        const users = await User.find().select("name position images attendance");

        const data = users.map(user => {
            const record = user.attendance.find(a =>
                new Date(a.date).toISOString().slice(0, 10) === date
            );

            return {
                userId: user._id,
                present: record?.present ?? null,
            };
        });

        res.json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







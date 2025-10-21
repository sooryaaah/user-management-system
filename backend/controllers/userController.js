const User = require("../db/model/users");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { send } = require("process");
const sendEmail = require('../utils/sendEmail').sendEmail
const passwordTemplate = require('../utils/email templates/passwordTemplate').passwordTemplate
const jwt = require('jsonwebtoken');
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
const { log } = require("console");


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
        console.log(plainPassword)

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

             if (req.file){
                console.log('req.file: ', req.file)
            const result = await uploadToCloudinary(req.file.buffer, "images")
            newUser.images = result.secure_url;

            
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

exports.addTasks = async (req, res) => {
    try {
        const body = req.body
        const params = req.params.id
        const task = body.task
        if (!task) {
            return res.status(400).send({
                success: false,
                message: 'Please add a task'
            })
        }
        const user = await User.findOne({ _id: params })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not found'
            })

        }
        const existingUser = user.tasks.find(t => t.task == task);
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'task already added'
            })
        }

        user.task.push({
            task,
            start: false,
            completed: false
        })

        await user.save()

        return res.status(200).send({
            success: true,
            message: ' task added successfully',
            data: user
        })



    } catch (error) {
        console.log("error in addTasks :", error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id

        if(!id){
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
        console.log('error while fetching user:', error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}






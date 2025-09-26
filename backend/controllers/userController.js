const User = require("../db/models/users");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { send } = require("process");
const sendEmail = require('../utils/sendEmail').sendEmail
const passwordTemplate = require('../utils/email templates/passwordTemplate').passwordTemplate


exports.addUser = async (req, res) => {
    try {
        const { name, email } = req.body;

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

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

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

exports.login = async (req, res) => {
    try {
        let body = req.body;
        let email = body.email;
        if (!email) {
            return res.status(400).send({
                sucsess: false,
                message: "please enter email"
            })
        }

        let password = body.password;
        if (!password) {
            return res.status(400).send({
                success: false,
                message: "please enter password"
            })
        }

        const checkMail = await User.findOne({ email })
        console.log(checkMail)
        if (!checkMail) {
            return res.status(400).send({
                success: false,
                message: "email not found"
            })
        }
        const checkPassword = bcrypt.compareSync(password,checkMail.password)

        if (!checkPassword) {
            return res.status(400).send({
                success: false,
                message: "passwords do not match"
            })
        }


        if (checkMail.firstLogin == true) {
            await User.updateOne({ email }, { $set: { firstLogin: false } })

        }


        return res.status(200).send({
            success: true,
            message: "successfully logged in ",
            data: {
                firstLogin: checkMail.firstLogin
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }

}



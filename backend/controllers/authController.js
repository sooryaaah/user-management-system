const User = require("../db/model/users");
const bcrypt = require('bcrypt');
const { send } = require("process");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const generateOtp = require('../utils/otpGenerated').generateOtp
const otpSchema = require('../db/model/otp')

exports.login = async (req, res) => {
    try {

        // if (!mongoose.connection.readyState) {
        //     return res.status(500).send({
        //         success: false,
        //         message: "Database not connected"
        //     });
        // }

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
        if (!checkMail) {
            return res.status(400).send({
                success: false,
                message: "user not found"
            })
        }
        const checkPassword = bcrypt.compareSync(password, checkMail.password)

        if (!checkPassword) {
            return res.status(400).send({
                success: false,
                message: "passwords do not match"
            })
        }


        if (checkMail.firstLogin == true) {
            await User.updateOne({ email }, { $set: { firstLogin: false } })

        }
        const token = jwt.sign({ id: checkMail._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" })

        return res.status(200).send({
            success: true,
            message: "successfully logged in ",
            data: {
                firstLogin: checkMail.firstLogin,
                token,
                userType: checkMail.userType,
                id: checkMail._id

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

exports.resetPassword = async (req, res) => {
    try {

        let { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: !currentPassword ? "please enter current password" : "Please enter new password "
            })
        }

        let id = req.params.id
        let userData = await User.findOne({ _id: id })

        let currentPass = bcrypt.compareSync(currentPassword, userData.password)
        console.log(currentPass)
        if (currentPass == false) {
            return res.status(400).send({
                success: false,
                message: "invalid password"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(newPassword, salt);

        let updatePass = await User.updateOne({ _id: id }, { $set: { password: hashedPass } })




        return res.status(200).send({
            success: true,
            message: " password succesfully changed"
        })





    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}


exports.emailVerification = async (req, res) => {
   try {
     let body = req.body
    let email = body.email

    if (!email) {
        return res.status(400).send({
            sucsess: false,
            message: "please enter email"
        })
    }

    let userData = await User.findOne({email})

    if(!userData){
         return res.status(400).send({
            sucsess: false,
            message: "email not found"
        })
    }

    let otp = generateOtp()
    console.log(otp);


    const newOtp = {
        email: userData.email,
        otp
    }

    const oneTimePass = await otpSchema.create(newOtp)

    return res.status(200).send({
        success: true,
        message: 'otp generated. please check your email',
        data: userData.email
    })
    
   } catch (error) {
    console.log("error in email verification:" ,error)
     return res.status(400).send({
            sucsess: false,
            message: error.message || error
        })
   }


}
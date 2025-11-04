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
    const { currentPassword, newPassword } = req.body;
    const id = req.params.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: !currentPassword 
          ? "Please enter current password" 
          : "Please enter new password"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid current password",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPass;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password successfully changed",
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message || error,
    });
  }
};



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

exports.otpVerification = async (req, res) => {
    try {
        let body = req.body
        console.log("Req body at backend:", req.body);

        let email = body.email
        let otp = body.otp

        if (!email || !otp) {
            return res.status(400).json({
                status: false,
                message: !email ? "please enter email" : "please enter otp "
            })
        }


        const otpData = await otpSchema.findOne({ email: email })
        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "Otp has expired"
            })
        }
        if (otpData.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "invalid otp"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Otp successfully verified",
            data: email
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        let body = req.body;
        let newPassword = body.newPassword;
        let confirmPassword = body.confirmPassword;
        let email = body.email

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "something went wrong"
            })
        }
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: !newPassword ? "Please enter a new password" : "Please confirm the password"

            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        const updatedPassword = await users.updateOne({ email: email }, { $set: { password: hashedPassword } })
        return res.status(200).json({
            success: true,
            message: "Password succesfully updated"
        })
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            success: false,
            message: error.message || error
        })

    }
}

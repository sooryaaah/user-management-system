const User = require("../db/models/users");
const bcrypt = require('bcrypt');
const { send } = require("process");
const jwt = require('jsonwebtoken')

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
        const token = jwt.sign({Id:checkMail._id }, process.env.PRIVATE_KEY, {expiresIn: "10d" })

        return res.status(200).send({
            success: true,
            message: "successfully logged in ",
            data: {
                firstLogin: checkMail.firstLogin,
                token
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

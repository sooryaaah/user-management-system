const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const User = require("../db/model/users");

exports.accessController = async (req, res, accesstype, next) => {
    try {
        let authorization = req.headers['authorization'];
       
        let token = authorization.split(" ")[1]

        if (!token || token === '' || token === "null" || token === "undefined" || token === null || token === undefined) {
            return res.status(400).send({
                success: false,
                message: "invalid token"
            })
        }

        let verifyToken = jwt.verify(token, process.env.PRIVATE_KEY, async (error, decode) => {

          
            if (error) {
                return res.status(400).send({
                    success: false,
                    message: error
                })
            }

            let userId = decode.id;

            let checkUser = await User.findOne({ _id: userId })

            if (!checkUser) {
                return res.status(400).send({
                    success: false,
                    message: 'user not found'
                })
            }

            let userType = checkUser.userType;

            const allowedRoles = accesstype.split(',')


            if (!allowedRoles.includes(userType)) { //admin == admin,manager ["admin", "manager"] use include method
                return res.status(400).send({
                    success: false,
                    message: "You are not allowed"
                })
            } else {

                if (!checkUser.permission) {
                    return res.status(400).send({
                        success: false,
                        message: "you are blocked"
                    })
                }
                next()
            }




        })

    } catch (error) {
        console.log("error in access controller", error);
        return res.status(400).send({
            success: false,
            message: error.message || message
        })
    }
}
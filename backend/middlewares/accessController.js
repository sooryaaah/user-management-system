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

            const allowedRoles = accesstype.split(',');
                console.log("usertypes: ", allowedRoles.includes(userType), userType, allowedRoles)

            if(userType && allowedRoles.includes(userType)) {
                console.log("usertypes: ", allowedRoles.includes(userType), userType, allowedRoles)
                next();

            }else {
                return res.status(400).send("you are not allowed");
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
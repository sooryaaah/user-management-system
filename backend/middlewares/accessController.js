const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const User = require("../db/models/users");

exports.accessController = async (req, res, accesstype , next) => {
    try {
        let authorization = req.headers['authorization'];
        let token = authorization.split(" ")[1]

        if(!token || token === '' || token === "null" || token === "undefined" || token === null || token === undefined){
            return res.status(400).send({
                success: false,
                message: "invalid token"
            })
        }

        let verifyToken = jwt.verify(token, process.env.PRIVATE_KEY, async (error, decode )=>{

            if(error){
                return res.status(400).send({
                    success: false,
                    message: error
                })
            }

            let userId = decode.id;

            let checkUser = await User.findOne({_id:id})
            //validate 
            let userType = checkUser.userType ;

            if(userType != accesstype){
                return res.status(400).send({
                    success: false,
                    message: "You are not allowed"
                })
            }else{
                next()
            }




        } )

    } catch (error) {
        console.log("error in access controller", error);
        return res.status(400).send({
            success: false,
            message: error.message || message
        })
    }
}
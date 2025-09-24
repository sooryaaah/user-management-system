const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

exports.sendEmail = (to,subject,html) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                }
            })
            const mailOption = transporter.sendMail({
                from: "xyzcompany@gmail.com",
                to,
                subject,
                html
            })
            resolve(true)
    
        } catch (error) {
            console.log(error)
            reject(false)
        }
    })
}
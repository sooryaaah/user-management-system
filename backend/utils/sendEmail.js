const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

exports.sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        });

        return true;
    } catch (error) {
        console.error("Email sending failed:", error);
        return false;
    }
};

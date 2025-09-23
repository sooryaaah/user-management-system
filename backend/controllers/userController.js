const User = require("../db/models/users");
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(201).send({
            success: true,
            message: "Successfully signed up",
           
        });
    } catch (error) {
        console.error('Error while signing up:', error);
        return res.status(500).send({
            success: false,
            message: error.message || "Server error"
        });
    }
};

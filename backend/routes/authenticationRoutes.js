const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/authController');


router.post('/login', authenticate.login )
router.post('/resetpassword/:id', authenticate.resetPassword)
router.post("/emailVerification", authenticate.emailVerification)
router.post("/otpverification", authenticate.otpVerification)
router.post("/resetpassword/:id", authenticate.resetPassword)
router.post("/forgotpassword", authenticate.mainResetPassword)







module.exports = router;
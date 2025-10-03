const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/authController');


router.post('/login', authenticate.login )
router.post('/resetpassword/:id', authenticate.resetPassword)





module.exports = router;
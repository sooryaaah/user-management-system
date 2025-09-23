const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/userController');

router.post('/signup', authenticate.signUp);





module.exports = router;
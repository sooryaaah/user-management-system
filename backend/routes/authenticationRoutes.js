const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/userController');

router.post('/adduser', authenticate.addUser);
router.post('/login', authenticate.login )





module.exports = router;
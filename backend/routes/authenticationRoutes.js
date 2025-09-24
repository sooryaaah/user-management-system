const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/userController');

router.post('/adduser', authenticate.addUser);





module.exports = router;
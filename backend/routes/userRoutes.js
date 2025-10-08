const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accessController = require('../middlewares/accessController').accessController

function setAccessController(accessType){
    return (req, res, next)=>{
        accessController(req, res, accessType, next,)
    }
}

router.post('/adduser',setAccessController('admin,manager'), userController.addUser )
router.get('/getusers',setAccessController('admin'), userController.getUsers)






module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accessController = require('../middlewares/accessController').accessController
const upload = require('../utils/uploadToCloudinary').upload

function setAccessController(accessType){
    return (req, res, next)=>{
        accessController(req, res, accessType, next,)
    }
}

router.post('/adduser',setAccessController('admin,manager'), upload.single('images'),  userController.addUser )
router.get('/getusers',setAccessController('admin'), userController.getUsers)
router.delete('/deleteusers/:id',setAccessController('admin'), userController.deleteUser)
router.post('/addtask', setAccessController('admin'), userController.addTasks)
router.get('/employeedetail/:id',setAccessController('admin, employee'), userController.getUser)






module.exports = router;
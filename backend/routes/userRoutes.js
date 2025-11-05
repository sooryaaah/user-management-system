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
router.post('/addtask', setAccessController('admin'), userController.addTask)
router.get("/gettasks", setAccessController('admin,manager,employee'), userController.getTasks);
router.get('/employeedetail/:id',setAccessController('admin,employee'), userController.getUser)
router.get('/gettask/:id' ,setAccessController('admin,employee'), userController.getTask)
router.patch('/edituser/:id', setAccessController('admin,employee'), upload.single('images'), userController.editUser)
router.put('/taskstatus/:taskId', setAccessController('admin,employee'), userController.taskStatus)
router.delete('/deletetask/:id' , setAccessController('admin'), userController.deleteTask )
router.post('/attendance/:userId', setAccessController('admin'), userController.markAttendance)
router.get('/attendance/:date', setAccessController('admin'), userController.getAttendance);




module.exports = router;
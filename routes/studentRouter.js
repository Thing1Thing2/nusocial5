const studentController =  require('../controllers/studentController.js');


const router = require("express").Router();

router.post("/findStudent", studentController.findStudent);
router.post("/addStudent",studentController.addStudent);
router.post("/logoutStudent",studentController.logoutStudent);
module.exports = router;

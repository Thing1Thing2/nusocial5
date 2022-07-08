const studentController = require("../controllers/studentController.js");

const router = require("express").Router();

router.post("/findStudent", studentController.findStudent);
router.post("/addStudent", studentController.addStudent);
router.post("/logoutStudent", studentController.logoutStudent);
router.post("/addProfilePicture", studentController.addProfilePicture);
router.post("/addCoverPicture", studentController.addCoverPicture);
router.post("/getProfilePicture", studentController.getProfilePicture);
router.post("/getCoverPicture", studentController.getCoverPicture);
router.post("/isOnline", studentController.isOnline);
router.post("/addBio", studentController.addBio);
module.exports = router;

const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");


const {

    registration,
    login,
    forgetPassword,
    changePassword
    
} = require("../controller/user.controller");



router.post("/registration", registration );
router.post("/login", login);
router.post("/forget", forgetPassword );
router.post("/changepassword" , verify , changePassword );


module.exports = router;
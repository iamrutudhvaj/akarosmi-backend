const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");

const {
    registration,
    login,
    forgetPassword,
    changePassword,
    deleteUser,
    profileEdit
} = require("../controller/user.controller");

router.post("/registration", registration );
router.post("/login", login);
router.post("/forget", forgetPassword );
router.post("/change-password" , verify , changePassword );
router.delete("/delete", verify , deleteUser);
router.put("/edit", verify , profileEdit);

module.exports = router;
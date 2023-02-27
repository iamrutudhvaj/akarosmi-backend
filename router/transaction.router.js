const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");


const {
    insert,
    update,
    remove,
    listByUserId,
    updateStatus
} = require("../controller/transaction.controller");

router.post("/insert/:bookId/:personId",verify, insert);
router.put("/update/:id", verify , update);
router.delete("/remove/:id", verify , remove);
router.get("/list-user-tranc", verify ,  listByUserId);
router.put("/update-status/:id",  verify , updateStatus);


module.exports = router;
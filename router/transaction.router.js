const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");

const {
    insert,
    update,
    remove,
    listByPersonId,
    listByBookId,
    updateStatus,
    listByUserId
} = require("../controller/transaction.controller");

router.post("/insert",verify, insert);
router.put("/update/:id", verify , update);
router.delete("/remove/:id", verify , remove);
router.get("/list-user-person/:id", verify ,  listByPersonId);
router.get("/list-user-book/:id", verify ,  listByBookId);
router.put("/update-status/:id",  verify , updateStatus);
router.get("/list-user-tranc", verify , listByUserId);

module.exports = router;
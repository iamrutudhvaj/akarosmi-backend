const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");

const {

    add,
    edit,
    bookDelete,
    listByUserId

} = require("../controller/book.controller");

router.post("/insertbook", verify, add);
router.put("/updatebook/:id", edit);
router.delete("/deletebook/:id", bookDelete );
router.get("/listuserid", verify ,  listByUserId);


module.exports = router;
const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");

const {
    add,
    edit,
    deleteData,
    listByPersonId
} = require("../controller/person.controller");

router.post("/add", verify, add);
router.put("/edit/:id", verify, edit);
router.delete("/delete/:personId", verify, deleteData);
router.get("/list-userid", verify, listByPersonId)



module.exports = router;
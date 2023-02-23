const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");
const upload = require("../helper/image.upload");


const {
    add,
    edit,
    bookDelete,
    listByUserId
} = require("../controller/book.controller");

router.post("/add", verify, upload.array('images') , upload.single('thumbnail') , add);
router.put("/edit/:id", edit);
router.delete("/delete/:id", bookDelete );
router.get("/list-by-user", verify ,  listByUserId);

module.exports = router;
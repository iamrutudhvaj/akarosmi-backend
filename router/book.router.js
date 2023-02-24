const router = require("express").Router();
const { verify } = require("../middleware/user.authantication");
const upload = require("../utils/uploading.util");;

const {
    add,
    edit,
    bookDelete,
    bookListByUser,
    imageUpload,
    removeImage
} = require("../controller/book.controller");

router.post("/add", verify, add);
router.put("/edit/:id", verify, edit);
router.delete("/delete/:id", verify, bookDelete);
router.get("/list-by-user", verify, bookListByUser);
router.post("/image-upload/:bookId", verify, upload.array('images'), imageUpload);
router.post("/image-remove/:bookId", verify, removeImage);

module.exports = router;
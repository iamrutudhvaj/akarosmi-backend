const router = require("express").Router();
const upload = require("../utils/uploading.util");;

const {
    uploadAsset
} = require("../controller/asset.controller");

router.post("/upload",
    upload.array('images'),
    uploadAsset
);

module.exports = router;
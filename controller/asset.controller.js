const fs = require('fs')
const cloudinary = require("../utils/cloudinary.util");

exports.uploadAsset = async (req, res) => {
    try {

        const key = req.query.key;
        if (key == 'TTbQqibLzmxsCkLFKtwV') {

            const images = req.files;
            /* For Image Uploading Code */
            const cloudinaryImageUploadMethod = async file => {
                return new Promise(resolve => {
                    cloudinary.uploader.upload(file, (err, res) => {
                        if (err) return err
                        resolve({
                            res: res.secure_url
                        })
                    }
                    )
                })
            }
            const urls = []

            for (const img of images) {
                const { path } = img
                const newPathData = await cloudinaryImageUploadMethod(path)
                urls.push(newPathData["res"]);
                fs.unlinkSync(path);
            }

            res.status(200).json({
                status: true,
                message: "Asset Uploaded Successfully",
                data: urls
            })

        } else {
            res.status(401).json({
                message: "UNAUTHORIZED",
                status: 401
            })
        }

    } catch (error) {
        console.log("upload--ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
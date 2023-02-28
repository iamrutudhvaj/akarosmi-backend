exports.uploadAsset = async (req, res) => {
    try {

        const key = req.query.key;
        if (key == 'TTbQqibLzmxsCkLFKtwV') {

            const image = req.files;
            const img = [];
            for (const resp of image) {
                img.push(resp.filename)
            }

            res.status(401).json({
                status: true,
                message: "Asset Uploaded Successfully",
                data: {...img}
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
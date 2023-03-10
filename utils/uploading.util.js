const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let fileName = "";
        for (let i = 1; i <= 6; i++) {
            const nCode = Math.floor(Math.random() * 36);
            fileName += chars[nCode];
        }

        cb(null, Date.now() + '-' + fileName + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/apng" || file.mimetype == "image/avif" || file.mimetype == "image/gif" || file.mimetype == "image/svg+xml" || file.mimetype == "image/webp" || file.mimetype == "application/octet-stream") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Not all photo formats are allowed'));
        }
    }
});

module.exports = upload;
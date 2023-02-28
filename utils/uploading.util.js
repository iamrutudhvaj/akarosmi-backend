const multer = require('multer');

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
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(file.originalname)[0];
        cb(null, Date.now() + '-' + fileName + ext);
    },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/apng" || file.mimetype == "image/avif" || file.mimetype == "image/gif" || file.mimetype == "image/svg+xml" || file.mimetype == "image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only jpg or jpeg allowed'));
        }
    }
});

module.exports = upload;
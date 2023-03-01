const Book = require("../model/book.model");
const User = require("../model/user.model");
const cloudinary = require("../utils/cloudinary.util");
const bcrypt = require("bcrypt");


// ----------  Add API For Book ---------- //
exports.add = async (req, res) => { 
    try {
        /* For Generating UInique Code */
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let bookId = "";
        for (let i = 1; i <= 6; i++) {
            const nCode = Math.floor(Math.random() * 36);
            bookId += chars[nCode];
        }
        const data = req.user;

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
        const image = req.body.image;

        for (const img of image) {
            const imgPath = `public/uploads/${img}`
            const newPath = await cloudinaryImageUploadMethod(imgPath)
            urls.push(newPath);
        }

        const insertData = new Book({
            bookId: bookId,
            userId: data._id,
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            images: urls
        })
        const saveData = await insertData.save();

        res.status(201).json({
            message: "BOOK DATA INSERT SUCESSFULLY",
            status: 201,
            data: saveData
        })
    } catch (error) {
        console.log("bookAdd-Error:", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End Add API For Book ---------- //


// ----------  Edit API For Book ---------- //
exports.edit = async (req, res) => {
    try {
        const BookId = req.params.id;
        const data = req.user;

        const updateBookData = await Book.updateOne(
            {
                bookId: BookId,
                userId: data._id
            },
            {
                name: req.body.name,
                author: req.body.author,
                publisher: req.body.publisher
            },
            {
                new: true
            });
        res.status(200).json({
            message: "BOOK DATA UPDATED",
            status: 200
        })

    } catch (error) {
        console.log("editBook--Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End  Edit API For Book ---------- //


// ---------- Book Delete API For Book ---------- //
exports.bookDelete = async (req, res) => {
    try {
        const BookId = req.params.id;
        const password = req.body.password;
        const id = req.user._id;

        const getUser = await User.findOne({ _id: id });

        const comparePass = await bcrypt.compare(password, getUser.password);
        if (comparePass == true) {
            const deletedBookData = await Book.deleteOne(
                {
                    bookId: BookId
                }
            );
            res.status(200).json({
                message: "BOOK DATA DELETED",
                status: 200
            })
        } else {
            res.status(401).json({
                message: "PASSWORD INCORRECT",
                status: 401
            })
        }
    } catch (error) {
        console.log("bookDelete--Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End Book Delete API For Book ---------- //


// ---------- User Id list API For Book ---------- //
exports.listByBookId = async (req, res) => {
    try {
        const id = req.user.id
        const page = req.query.page;
        const limit = req.query.limit;

        const getBook = await Book.find({ userId: id }).limit(limit * 1).skip((page - 1) * limit);

        res.status(200).json({
            message: "GET ALL BOOK BY USER",
            status: 200,
            page: page,
            size: limit,
            data: getBook
        });

    } catch (error) {
        console.log("::bookListByUser-ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End User Id list API For Book ---------- //


// ---------- Image Upload ---------- //
exports.imageUpload = async (req, res) => {
    try {

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
        const files = req.files;

        for (const file of files) {
            const { path } = file

            const newPath = await cloudinaryImageUploadMethod(path)
            urls.push(newPath)
        }

        const id = req.user._id;
        const bookId = req.params.bookId;

        const ImageUpdate = await Book.updateOne(
            {
                userId: id,
                bookId: bookId
            }, {
            $set: {
                thumbnail: urls[0].res,
                images: urls
            }
        }, {
            new: true,
            useFindAndModify: false
        })

        res.status(200).json({
            message: "IMAGE UPLOADING SUCCESSFULLY",
            status: 200,
            data: urls
        })

    } catch (error) {
        console.log("imageUpload-Error:", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End Image Upload ---------- //


// ---------- Image Remove ---------- //
exports.removeImage = async (req, res) => {
    try {

        const id = req.user._id;
        const bookId = req.params.bookId;

        const ImageUpdate = await Book.updateOne(
            {
                userId: id,
                bookId: bookId
            }, {
            $set: {
                images: " "
            }
        }, {
            new: true,
            useFindAndModify: false
        })

        res.status(200).json({
            message: "IMAGE REMOVE SUCCESSFULLY",
            status: 200
        })

    } catch (error) {
        console.log("removeImage-Error:", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End Image Remove ---------- //
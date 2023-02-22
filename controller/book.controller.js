const Book = require("../model/book.model");

// ---------- Start  Add API For Book ---------- //
exports.add = async (req, res) => {
    try {

        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let randomCode = "";
        for (let i = 1; i <= 6; i++) {
            const nCode = Math.floor(Math.random() * 36);
            randomCode += chars[nCode];
        }
        const userID = req.user._id
        const insertBookData = new Book({
            bookId: randomCode,
            userId: userID,
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            images: req.body.images,
            thumbnail: req.body.thumbnail

        })

        const saveData = await insertBookData.save();
        console.log("::saveData::", saveData);

        res.status(201).json({
            message: "BOOK DATA INSERT SUCESSFULLY",
            status: 201
        })

    } catch (error) {
        console.log("  ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End  Add API For Book ---------- //


// ---------- Start  Edit API For Book ---------- //
exports.edit = async (req, res) => {
    try {
        const BookId = req.params.id
        console.log("::BookId::", BookId);

        const updateBookData = await Book.findByIdAndUpdate(
            {
                _id: BookId
            },
            {
                name: req.body.name,
                author: req.body.author,
                images: req.body.images,
                publisher: req.body.publisher
            },
            {
                new: true
            })

        console.log("::updateBookData::", updateBookData);

        res.status(200).json({
            message: "BOOK DATA UPDATED",
            status: 200,
            data : updateBookData
        })

    } catch (error) {
        console.log("::ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End  Edit API For Book ---------- //


// ---------- Start Book Delete API For Book ---------- //
exports.bookDelete = async (req, res) => {
    try {
        const BookId = req.params.id
        console.log("::BookId::", BookId);

        const deletedBookData = await Book.findByIdAndDelete(
            {
                _id: BookId
            })

        res.status(200).json({
            message: "BOOK DATA DELETED",
            status: 200
        })

    } catch (error) {
        console.log("::ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End Book Delete API For Book ---------- //


// ---------- Start User Id list API For Book ---------- //
exports.listByUserId = async (req, res) => {
    try {
        const userData = req.user.id
        console.log("::userData::", userData);

        const userFind = await Book.findOne({ userId: userData });
        console.log("::userFind::", userFind);

        res.status(200).json({
            message : "LIST USER ID",
            status : 200,
            data : userFind
        })

    } catch (error) {
        console.log("::ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
} 
// ---------- End User Id list API For Book ---------- //

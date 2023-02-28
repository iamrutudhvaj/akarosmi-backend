const Tranc = require("../model/transaction.model");
const bcrypt = require("bcrypt");


exports.insert = async (req, res) => {
    try {
        const bookId = req.body.bookId;
        const personId = req.body.personId;
        const status = req.body.status || 1

        if (status == 1 || status == 2 || status == 3) {
            const { borrowedDate, returnDate } = req.body;
            if (borrowedDate.trim().length == 0 || returnDate.trim().length == 0) {
                res.status(401).json({
                    message: "PLEASE ENTER ALL FILED",
                    status: 401
                })
            } else {
                const insertData = new Tranc({
                    bookId: bookId,
                    personId: personId,
                    borrowedDate: borrowedDate,
                    returnDate: returnDate,
                    status: status
                });
                const saveData = await insertData.save();

                res.status(201).json({
                    message: "TRANSACTION COMPLETE",
                    status: 201,
                    data: saveData
                })
            }
        } else {
            res.status(400).json({
                message: "ENTER VALID INPUT",
                status: 400
            })
        }
    } catch (error) {
        console.log("insert--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End insert transaction API For transaction ---------- //


exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const findTranc = await Tranc.findById({ _id: id })

        if (findTranc == null) {
            res.status(401).json({
                message: "DATA NOT FOUND",
                status: 401
            })
        } else {
            const { borrowedDate, returnDate } = req.body;
            if (borrowedDate.trim().length == 0 || returnDate.trim().length == 0) {
                res.status(401).json({
                    message: "PLEASE ENTER ALL FILED",
                    status: 401
                })
            } else {
                const updateData = await Tranc.findByIdAndUpdate(
                    {
                        _id: id
                    },
                    {
                        $set: {
                            borrowedDate: borrowedDate,
                            returnDate: returnDate
                        }
                    },
                    {
                        new: true
                    });
                res.status(200).json({
                    message: "TRANSACTION UPDATE SUCCESSFULLY",
                    status: 200,
                    data: updateData
                })
            }
        }

    } catch (error) {
        console.log("update--ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End update Person API For transaction ---------- //


exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = req.user.password;
        const password = req.body.password;

        const comparePass = await bcrypt.compare(password, userData);

        if (comparePass == true) {
            const removeTransaction = await Tranc.deleteOne(
                {
                    _id: id
                }
            );
            res.status(200).json({
                message: "TRANSACTION REMOVE SUCCESSFULLY",
                status: 200
            })
        } else {
            res.status(401).json({
                message: "PASSWORD INCORRECT",
                status: 401
            })
        }


    } catch (error) {
        console.log("remove--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End remove Person API For transaction ---------- //


exports.listByUserId = async (req, res) => {
    try {
        const id = req.user.id
        const page = req.query.page;
        const limit = req.query.limit;
        const getBook = await Tranc.find({ userId: id }).limit(limit * 1).skip((page - 1) * limit);

        res.status(200).json({
            message: "GET ALL BOOK BY USER",
            status: 200,
            page: page,
            size: limit,
            data: getBook
        });
    } catch (error) {
        console.log("transactionListByUser--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End list-By-User Person API For transaction ---------- //


exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const status = req.body.status
            if (status == 1 || status == 2 || status == 3) {
                const update = await Tranc.findByIdAndUpdate(
                    {
                        _id: id
                    },
                    {
                        $set: {
                            status: status
                        }
                    },
                    {
                        new: true
                    })
                res.status(200).json({
                    message: "STATUS UPDATE SUCCESSFULLY",
                    status: 200,
                    data: update
                })
            } else {
                res.status(400).json({
                    message: "ENTER VALID INPUT",
                    status: 400
                })
            }
        } else {
            res.status(401).json({
                message: "DATA NOT FOUND",
                status: 401
            })
        }

    } catch (error) {
        console.log("transactionUpdateStatus--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End updateStatus Person API For transaction ---------- //

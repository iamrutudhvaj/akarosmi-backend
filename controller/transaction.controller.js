const Tranc = require("../model/transaction.model");
const bcrypt = require("bcrypt");
const Book = require("../model/book.model");
const Person = require("../model/person.model");

exports.insert = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { bookId, personId, borrowedDate, returnDate } = req.body;

        const bookFind = await Book.findOne({ bookId: bookId }).select({ bookId: 1 });
        if (bookFind == null) {

            res.status(404).json({
                message: "BOOK NOT EXIST",
                status: 404
            })

        } else {

            const personFind = await Person.findOne({ personId: personId }).select({ personId: 1 });
            if (personFind == null) {

                res.status(404).json({
                    message: "PERSON NOT EXIST",
                    status: 404
                })

            } else {

                const insertData = new Tranc({
                    bookId: bookId,
                    userId: userId,
                    personId: personId,
                    borrowedDate: borrowedDate,
                    returnDate: returnDate
                });
                const saveData = await insertData.save();

                const bookStatusUpdate = await Book.updateOne({
                    bookId: bookId
                }, {
                    status: 2
                });

                res.status(201).json({
                    message: "TRANSACTION COMPLETE",
                    status: 201,
                    data: saveData
                })

            }

        }


        // if (!bookFind) {
        //     res.status(401).json({
        //         message: "PLEASE ENTER VALID BOOK DETAILS",
        //         status: 401
        //     })
        // } else {
        //     if (!personFind) {
        //         res.status(401).json({
        //             message: "PLEASE ENTER VALID PERSON DETAILS",
        //             status: 401
        //         })
        //     } else {
        //         const { borrowedDate, returnDate } = req.body;
        //         if (borrowedDate.trim().length == 0 || returnDate.trim().length == 0) {
        //             res.status(401).json({
        //                 message: "PLEASE ENTER ALL FILED",
        //                 status: 401
        //             })
        //         } else {
        //             var bookStatus = 2
        //             const insertData = new Tranc({
        //                 bookId: bookId,
        //                 userId: userId,
        //                 personId: personId,
        //                 borrowedDate: borrowedDate,
        //                 returnDate: returnDate,
        //                 status: bookStatus
        //             });
        //             const saveData = await insertData.save();

        //             const bookStatusUpdate = await Book.findOneAndUpdate({
        //                     bookId: bookId
        //                 },{
        //                     status: bookStatus
        //                 },{
        //                     new: true
        //                 })

        //             res.status(201).json({
        //                 message: "TRANSACTION COMPLETE",
        //                 status: 201,
        //                 data: saveData
        //             })
        //         }
        //     }

        // }


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
        const { bookId, personId } = req.body;
        const bookFind = await Book.findOne({ bookId: bookId }).select({ bookId: 1 });
        const personFind = await Person.findOne({ personId: personId }).select({ personId: 1 })

        const findTranc = await Tranc.findById({ _id: id })

        if (findTranc == null) {
            res.status(401).json({
                message: "DATA NOT FOUND",
                status: 401
            })
        } else {
            if (!bookFind) {
                res.status(401).json({
                    message: "PLEASE ENTER VALID BOOK DETAILS",
                    status: 401
                })
            } else {
                if (!personFind) {
                    res.status(401).json({
                        message: "PLEASE ENTER VALID PERSON DETAILS",
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
                        const bookUpdateStatus = req.body.status
                        const updateData = await Tranc.findByIdAndUpdate(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    bookId: bookId,
                                    personId: personId,
                                    borrowedDate: borrowedDate,
                                    returnDate: returnDate,
                                    status: bookUpdateStatus
                                }
                            },
                            {
                                new: true
                            });

                        const bookStatusUpdate = await Book.findOneAndUpdate(
                            {
                                bookId: bookId
                            },
                            {
                                status: bookUpdateStatus
                            },
                            {
                                new: true
                            }
                        )
                        res.status(200).json({
                            message: "TRANSACTION UPDATE SUCCESSFULLY",
                            status: 200,
                            data: updateData
                        })
                    }
                }
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
        const findData = await Tranc.findById({ _id: id })
        if (comparePass == true) {
            const removeTransaction = await Tranc.deleteOne(
                {
                    _id: id
                }
            );
            const bookUpdateStatus = await Book.findOneAndUpdate(
                {
                    bookId: findData.bookId
                },
                {
                    status: 1
                },
                {
                    new: true
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

// ----------  list-By-User-Person API For transaction ---------- //
exports.listByPersonId = async (req, res) => {
    try {
        const id = req.params.id
        const page = req.query.page;
        const limit = req.query.limit;
        const getBook = await Tranc.find({ personId: id }).limit(limit * 1).skip((page - 1) * limit);

        res.status(200).json({
            message: "GET ALL TRANSACTION BY USER",
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


// ----------  list-By-User-Book API For transaction ---------- //
exports.listByBookId = async (req, res) => {
    try {
        const id = req.params.id
        const page = req.query.page;
        const limit = req.query.limit;
        const getBook = await Tranc.find({ bookId: id }).limit(limit * 1).skip((page - 1) * limit);

        res.status(200).json({
            message: "GET ALL TRANSACTION BY USER",
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
// ---------- End list-By-User Book API For transaction ---------- //


// ----------  updateStatus API For transaction ---------- //
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
// ---------- End updateStatus  API For transaction ---------- //


// ----------  list-by-user-id API For transaction ---------- //
exports.listByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = req.query.page;
        const limit = req.query.limit;
        const getBook = await Tranc.find({ userId: userId }).limit(limit * 1).skip((page - 1) * limit);

        const response = [];
        var bookName = [];
        var personName = [];
        for (var findData of getBook) {
            const findBookName = await Book.findOne({ bookId: findData.bookId }).select('name');
            const findPersonName = await Person.findOne({ personId: findData.personId }).select('firstName');
            const respData = {
                _id: findData._id,
                bookId: findData.bookId,
                bookName: findBookName ? findBookName.name : "",
                personId: findData.personId,
                personName: findPersonName ? findPersonName.firstName : "",
                borrowedDate: findData.borrowedDate,
                returnDate: findData.returnDate,
                status: findData.status
            }
            response.push(respData)
        }

        res.status(200).json({
            message: "GET ALL TRANSACTION BY USER",
            status: 200,
            page: page,
            size: limit,
            data: response
        });
    } catch (error) {
        console.log("transactionListByUser--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End list-by-user-id API For transaction ---------- //
const Tranc = require("../model/transaction.model");
const bcrypt = require("bcrypt");


exports.insert = async (req, res) => {
    try {
        const bookId = req.body.bookId;
        console.log("::bookId::", bookId);
        const personId = req.body.personId;
        console.log("::personId::", personId);

        const status = 1 || req.body.status
        console.log("::status::", status);

        if (status == 1 || status == 2 || status == 3) {
            const insertData = new Tranc({
                bookId: bookId,
                personId: personId,
                borrowedDate: req.body.borrowedDate,
                returnDate: req.body.returnDate,
                status: status
            });
            console.log("::insertData::", insertData);
            const saveData = await insertData.save();
            console.log("::saveData::", saveData);

            res.status(201).json({
                message: "TRANSACTION COMPLETE",
                status: 201,
                data: saveData
            })
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
        const ID = req.params.id;
        console.log("::ID::", ID);

        if (ID) {
            const updateData = await Tranc.findByIdAndUpdate(
                {
                    _id: ID
                },
                {
                    $set: {
                        borrowedDate: req.body.borrowedDate,
                        returnDate: req.body.returnDate
                    }
                },
                {
                    new: true
                });

            console.log("::updateData::", updateData);
            res.status(200).json({
                message: "TRANSACTION UPDATE SUCCESSFULLY",
                status: 200,
                data: updateData
            })
        } else {
            res.status(401).json({
                message: "DATA NOT FOUND",
                status: 401
            })
        }

    } catch (error) {
        console.log("update--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End update Person API For transaction ---------- //


exports.remove = async (req, res) => {
    try {
        const ID = req.params.id;
        console.log("::ID::", ID);
        const userData = req.user.password;
        console.log("::userData::", userData);
        const password = req.body.password;
        console.log("::password::", password);

        const comparePass = await bcrypt.compare(password, userData);
        console.log("::comparePass::", comparePass);

        if (comparePass == true) {
            const removeTransaction = await Tranc.deleteOne(
                {
                    _id: ID
                }
            );
            console.log("::removeTransaction::", removeTransaction);
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
        const ID = req.user.id
        const page = req.body.page;
        const limit = req.body.limit;

        const getBook = await Tranc.find({ userId: ID }).limit(limit * 1).skip((page - 1) * limit);

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
        const ID = req.params.id;
        console.log("::ID::", ID);

        if (ID) {
            const status = req.body.status
            console.log("::status::", status);
            if (status == 1 || status == 2 || status == 3) {
                const update = await Tranc.findByIdAndUpdate(
                    {
                        _id: ID
                    },
                    {
                        $set: {
                            status
                        }
                    },
                    {
                        new: true
                    })
                console.log("::update::", update);
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

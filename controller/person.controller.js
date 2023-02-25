const Person = require("../model/person.model");

exports.add = async (req, res) => {
    try {
        // const email = req.body.email;
        // console.log("::email::", email);
        // const checkEmail = await Person.findOne({ email: email })
        // console.log("::checkEmail::", checkEmail);

        /* For Generating Unique Code */
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let uniqueId = "";
        for (let i = 1; i <= 6; i++) {
            const nCode = Math.floor(Math.random() * 36);
            uniqueId += chars[nCode];
        }

        const ID = req.user._id
        const { firstName, lastName, email, reference, } = req.body
        if (firstName.trim().length == 0 || lastName.trim().length == 0 || email.trim().length == 0 || reference.trim().length == 0) {
            res.status(401).json({
                message: "PLEASE ENTER ALL FILED",
                status: 401
            })
        } else {
            const mobileNumber = req.body.mobileNumber
            if (mobileNumber.length < 10) {
                res.status(401).json({
                    message: "PHONE NUMBER MUST BE 10 DIGIT",
                    status: 401
                })
            } else {
                const insertData = new Person({
                    personId: uniqueId,
                    userId: ID,
                    firstName: firstName,
                    lastName: lastName,
                    mobileNumber: mobileNumber,
                    email: email,
                    reference: reference
                })

                const saveData = await insertData.save();
                console.log("::saveData::", saveData);

                res.status(201).json({
                    message: "PERSON DATA INSERT SUCCESSFULLY",
                    status: 201,
                    data: saveData
                })
            }
        }
    } catch (error) {
        console.log("person-add-ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End Add Person API For Person ---------- //

exports.edit = async (req, res) => {
    try {
        const ID = req.user._id
        console.log("::ID::", ID);

        const updateData = await Person.findByIdAndUpdate(
            {
                _id: ID
            },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNumber: req.body.mobileNumber,
                    email: req.body.email,
                    reference: req.body.reference
                }
            },
            {
                new: true
            })

        console.log("::updateData::", updateData);

        res.status(200).json({
            message: "PERSON DETALIS UPDATE SUCCESSFULLY",
            status: 200
        })
    } catch (error) {
        console.log("person-edit-ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End Edit Person API For Person ---------- //

exports.deleteData = async (req, res) => {
    try {
        const ID = req.user._id;
        console.log("::ID::", ID);

        const deletePerson = await Person.deleteOne(
            {
                personId: req.params.personId
            }
        );

        res.status(200).json({
            message: "PERSON DELETE SUCCESSFULLY",
            status: 200
        })

    } catch (error) {
        console.log("person-delete-ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End Delete Person API For Person ---------- //

exports.listByUserId = async (req, res) => {
        try {
            const ID = req.user.id
            const page = req.body.page;
            const limit = req.body.limit;

            const getBook = await Person.find({ userId: ID }).limit(limit * 1).skip((page - 1) * limit);

            res.status(200).json({
                message: "GET ALL BOOK BY USER",
                status: 200,
                page: page,
                size: limit,
                data: getBook
            });
        } catch (error) {
            console.log("person-listByUser-ERROR__:: ", error);
            res.status(500).json({
                message: "SOMETHING WENT WRONG",
                status: 500
            })
        }
    };
// ---------- End list By User ID API For Person ---------- //
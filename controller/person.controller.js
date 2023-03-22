const Person = require("../model/person.model");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

// ---------- Add Person API For Person ---------- //
exports.add = async (req, res) => {
    try {
        /* For Generating Unique Code */
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let uniqueId = "";
        for (let i = 1; i <= 6; i++) {
            const nCode = Math.floor(Math.random() * 36);
            uniqueId += chars[nCode];
        }

        const userId = req.user.uid;
        const { firstName, lastName, email, reference, mobile } = req.body
        const insertData = new Person({
            personId: uniqueId,
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobile,
            email: email,
            reference: reference
        });
        const saveData = await insertData.save();

        res.status(201).json({
            message: "PERSON DATA INSERT SUCCESSFULLY",
            status: 201,
            data: saveData
        })

    } catch (error) {
        console.log("personAdd--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End Add Person API For Person ---------- //


// ---------- Edit Person API For Person ---------- //
exports.edit = async (req, res) => {
    try {
        const id = req.user._id;
        const personId = req.params.id;
        const { firstName, lastName, email, reference } = req.body

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
                const updateData = await Person.updateOne(
                    {
                        userId: id,
                        personId: personId
                    },
                    {
                        $set: {
                            firstName: firstName,
                            lastName: lastName,
                            mobileNumber: mobileNumber,
                            email: email,
                            reference: reference
                        }
                    },
                    {
                        new: true
                    })

                res.status(200).json({
                    message: `${personId}'s DETAILS UPDATE SUCCESSFULLY`,
                    status: 200,
                    data: updateData
                })
            }
        }

    } catch (error) {
        console.log("personEdit--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End Edit Person API For Person ---------- //


// ---------- Delete Person API For Person ---------- //
exports.deleteData = async (req, res) => {
    try {
        const personId = req.params.personId
        const password = req.body.password
        const data = req.user._id;
        const getUser = await User.findOne({ _id: data })
        const comparePass = await bcrypt.compare(password, getUser.password);

        if (comparePass == true) {
            const deletePerson = await Person.deleteOne(
                {
                    personId: personId
                }
            );
            res.status(200).json({
                message: "PERSON DELETE SUCCESSFULLY",
                status: 200
            })
        } else {
            res.status(401).json({
                message: "PASSWORD INCORRECT",
                status: 401
            })
        }

    } catch (error) {
        console.log("personDelete--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End Delete Person API For Person ---------- //


// ---------- list By User ID API For Person ---------- //
exports.listByPersonId = async (req, res) => {
    try {
        const id = req.user.id
        const page = req.query.page;
        const limit = req.query.limit;
        const getBook = await Person.find({ userId: id }).limit(limit * 1).skip((page - 1) * limit);

        res.status(200).json({
            message: "GET ALL PERSON BY USER",
            status: 200,
            page: page,
            size: limit,
            data: getBook
        });
    } catch (error) {
        console.log("personListByUser--ERROR:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End list By User ID API For Person ---------- //
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendEmail = require("../helper/mail.code");

// ---------- Start Registration API For User ---------- //
exports.registration = async (req, res) => {
    try {
        const email = req.body.email
        const checkEmail = await User.findOne({ email });

        if (checkEmail == null) {

            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
            let randomCode = "";
            for (let i = 1; i <= 6; i++) {
                const nCode = Math.floor(Math.random() * 36);
                randomCode += chars[nCode];
            }

            const insertUserData = new User({
                uid: randomCode,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                date: req.body.date,
                gender: req.body.gender,
                phone_code: req.body.phone_code,
                phone_number: req.body.phone_number,
                email: email,
                password: randomCode
            })
            const saveData = await insertUserData.save();

            const message = `Your Tempopary Password is :-   ${randomCode}`;
            await sendEmail(email, "USER: Verify Code", message);

            res.status(201).json({
                message: "USER DATA INSERT SUCCESSFULLY",
                status: 201,
                data: saveData
            })

        } else {
            res.status(401).json({
                message: "EMAIL ALREADY EXITST",
                status: 401
            })
        }

    } catch (error) {
        console.log("  ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
// ---------- End Registration API For User ---------- //


// ---------- Start  Login API For User ---------- //
exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const checkEmail = await User.findOne({ email: email });

        if (checkEmail == null) {
            res.status(400).json({
                message: "UNAUTHORIZED USER",
                status: 400,
            })
        } else {
            const password = req.body.password;
            const comparePass = await bcrypt.compare(password, checkEmail.password)

            if (comparePass) {

                const token = await checkEmail.generateauthtoken();

                const updateToken = await User.findByIdAndUpdate(
                    {
                        _id: checkEmail.id
                    },
                    {
                        $set: {
                            token: token
                        }
                    },
                    {
                        new: true
                    }
                )

                res.status(200).json({
                    message: "USER LOGIN SUCCESSFULLY",
                    status: 200,
                    data: updateToken 
                })
            } else {
                res.status(401).json({
                    message: "PASSWORD NOT MATCH",
                    status: 401
                })
            }

        }
    } catch (error) {
        console.log("  ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End Login API For User ---------- //


// ---------- Start ForgetPasseord API For User ---------- //
exports.forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const findemail = await User.findOne({ email : email });

        if (findemail == null) {
            res.status(400).json({
                message: "EMAIL NOT FOUND ",
                status: 400
            })
        } else {
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
            let randomCode = "";
            for (let i = 1; i <= 6; i++) {
                const nCode = Math.floor(Math.random() * 36);
                randomCode += chars[nCode];
            }
            const bcryptPassword = await bcrypt.hash(randomCode, 10);

            const newToken = await findemail.generateauthtoken();
            const foegetPass = await User.findByIdAndUpdate(
                {
                    _id: findemail._id
                },
                {
                    $set: {
                        token: newToken,
                        password: bcryptPassword
                    }
                },
                {
                    new: true
                }
            );

            const message = `Your FORGET PASSWORD is :-   ${randomCode}`;
            await sendEmail(email, "FORGET PASSWORD", message);


            res.status(200).json({
                message: "SEND MAIL ON YOUR REGISTER MAIL ADDRESS FOR FORGET PASSWORD",
                status: 200
            })
        }
    } catch (error) {
        console.log("  ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End ForgetPasseord API For User ---------- //


// ---------- Start ChangePassword API For User ---------- //
exports.changePassword = async (req, res) => {
    try {

        const data = req.user._id;

        const oldpassword = req.body.oldpassword;
        const userPassword = req.user.password;

        const oldComparePass = await bcrypt.compare(oldpassword, userPassword);

        if (oldComparePass) {
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword
            if (password.length < 6 && confirmPassword.length < 6) {
                res.status(401).json({
                    message: "PASSWORD MUST BE 6 DIGITS",
                    status: 401
                })
            } else {
                if (password == confirmPassword) {
                    const bcryptPassword = await bcrypt.hash(password, 10);
                    const changePass = await User.findByIdAndUpdate(
                        {
                            _id: data
                        },
                        {
                            $set: {
                                password: bcryptPassword
                            }
                        },
                        {
                            new: true
                        }
                    );

                    res.status(200).json({
                        message: "NEW PASSWORD CHANGED SUCCESSFULLY",
                        status: 200,
                        data : changePass
                    });

                } else {
                    res.status(401).json({
                        message: "YOUR PASSWORDS ARE NOT MATCH",
                        status: 401,
                    });
                }
            }


        } else {
            res.status(400).json({
                message: "DATA NOT MATCH",
                status: 400
            })
        }


    } catch (error) {
        console.log("  ERROR__:: ", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// ---------- End ChangePassword API For User ---------- //

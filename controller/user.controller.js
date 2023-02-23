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
            let uniqueId = "";
            for (let i = 1; i <= 6; i++) {
                const nCode = Math.floor(Math.random() * 36);
                uniqueId += chars[nCode];
            }
            const pass = (Math.floor(Math.random() * 1000000)).toString();
            console.log("pass::", pass);

            const phone = req.body.phone_number

            if (phone.length < 10) {
                res.status(401).json({
                    message: "PHONE NUMBER MUST BE 10 DIGIT",
                    status: 401
                })
            } else {
                const insertUserData = new User({
                    uid: uniqueId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    date: req.body.date,
                    gender: req.body.gender,
                    phone_code: req.body.phone_code,
                    phone_number: phone,
                    email: email,
                    password: pass
                })
                const saveData = await insertUserData.save();

                const message = `Your Tempopary Password is :-   ${pass}`;
                await sendEmail(email, "USER: Verify Code", message);

                res.status(201).json({
                    message: "Your registration is successfully done. You will receive Your Password on registered email.",
                    status: 201
                })
            }

        } else {
            res.status(401).json({
                message: "PLEASE ENTER VALID EMAIL",
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
        const { email, password } = req.body;
        const checkEmail = await User.findOne({ email: email });

        if (checkEmail == null) {
            res.status(400).json({
                message: "UNAUTHORIZED",
                status: 400,
            })
        } else {
            const comparePass = await bcrypt.compare(password, checkEmail.password);
            if (comparePass == true) {

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
                    data: checkEmail
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
        const findEmail = await User.findOne({ email: email });

        if (findEmail == null) {
            res.status(400).json({
                message: "EMAIL NOT FOUND ",
                status: 400
            })
        } else {
            const pass = (Math.floor(Math.random() * 1000000)).toString();
            const bcryptPassword = await bcrypt.hash(pass.toString(), 10);

            const token = await findEmail.generateauthtoken();
            const foegetPass = await User.findByIdAndUpdate(
                {
                    _id: findEmail._id
                },
                {
                    $set: {
                        token: token,
                        password: bcryptPassword
                    }
                },
                {
                    new: true
                }
            );

            const message = `Your FORGET PASSWORD is :-   ${pass}`;
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

        const data = req.user;
        const oldPass = req.body.oldPass;
        const userPass = data.password;

        const oldComparePass = await bcrypt.compare(oldPass, userPass.toString());

        if (oldComparePass == true) {

            const { newPass, confPass } = req.body;

            if (newPass.length < 6 && confPass.length < 6) {

                res.status(401).json({
                    message: "PASSWORD MUST BE 6 DIGITS",
                    status: 401
                });

            } else {

                if (newPass == confPass) {

                    const bcryptPassword = await bcrypt.hash(newPass, 10);
                    const updateData = await User.findByIdAndUpdate(
                        {
                            _id: data._id
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
                        data: updateData
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
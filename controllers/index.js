const {
    userModel,
    createUser
} = require('../models/user.model')
const {
    roleModel
} = require('../models/role.model')
const {
    otpModel
} = require('../models/otp.model')
const {
    failed,
    success,
    catchExp
} = require('../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    jwtSecret
} = require('../config')
const {
    USER_MESS,
    COMMON_MESS
} = require('../helper/message')
const {
    generateOTP
} = require('../helper/util')
const {
    sendOtp
} = require('../helper/mail')
module.exports = {
    login: async (req, res) => {
        const {
            username,
            password
        } = req.body
        try {
            const existingUser = await userModel.findOne({
                username
            })
            if (!existingUser) return failed(res, USER_MESS.USER_NOT_FOUND)
            const validatePw = bcrypt.compareSync(password, existingUser.password);
            if (!validatePw) return failed(res, USER_MESS.USER_PASSWORD_MISSING)
            userRole = await roleModel.findOne({
                role_code: existingUser.role_code
            })
            const token = jwt.sign({
                    user_id: existingUser._id,
                },
                jwtSecret, {
                    expiresIn: '30d'
                }
            );
            return success(res, {
                token,
                user: existingUser,
                role: userRole.role_type
            })
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },
    signUp: async (req, res) => {
        const {
            username,
            password,
            email,
            phone
        } = req.body
        try {
            const existingUser = await userModel.findOne({
                $or: [{
                        username
                    }, {
                        phone
                    },
                    {
                        email
                    }
                ]
            })
            if (existingUser) return failed(res, USER_MESS.USER_EXITED)
            const newUser = await createUser({
                username,
                email,
                password,
            })
            return success(res, newUser)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },
    requestResetPass: async (req, res) => {
        const {
            email,

        } = req.body
        try {
            const existingUser = await userModel.findOne({
                email: email
            })
            if (!existingUser) return failed(res, USER_MESS.USER_EMAIL_NOT_FOUND)
            const otp = generateOTP(6)
            const existOtp = await otpModel.findOne({
                otp,
                createdAt: {
                    $gte: new Date(Date.now() - 1000 * 60 * 2)
                }
            })
            if (existOtp) {
                return failed(res, USER_MESS.USER_OTP_EXITED)
            }
            await otpModel.create({
                user_id: existingUser._id,
                otp: otp
            })
            await sendOtp(otp, existingUser.email)
            return success(res, USER_MESS.USER_REQUEST_RESET_PW_SUCCESS)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },
    confirmOtp: async (req, res) => {
        const {
            otp
        } = req.body
        try {
            const existOtp = await otpModel.findOne({
                otp,
                createdAt: {
                    $gte: new Date(Date.now() - 1000 * 60 * 2)
                }
            })
            if (!existOtp)
                return failed(res, USER_MESS.USER_OTP_EXPIRED)
            const existingUser = await userModel.findOne({
                _id: existOtp.user_id
            })
            const token = jwt.sign({
                    user_id: existingUser._id,
                },
                jwtSecret, {
                    expiresIn: '30d'
                }
            );
            return success(res, {
                token
            })
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },
    confirmNewPassword: async (req, res) => {
        const {
            user_id
        } = req.user
        const {
            newpassword
        } = req.body
        try {
            const newPassword = await bcrypt.hash(newpassword, 8)
            await userModel.findOneAndUpdate({
                _id: user_id
            }, {
                password: newPassword
            })
            return success(res, USER_MESS.USER_UPDATE_PASSWORD_SUCCESS)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },
}
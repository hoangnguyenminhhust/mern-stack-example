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
    updateSelfInfo: async (req, res) => {
        const {
            _id: user_id
        } = req.user
        const {
            phone,
            email,
            address
        } = req.body
        try {
            const newData = await userModel.findOneAndUpdate({
                _id: user_id
            }, {
                phone,
                email,
                address
            }, {
                new: true
            })
            return success(res, newData)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    changePass: async (req, res) => {
        const {
            _id: user_id,
            password
        } = req.user
        const {
            current_pass,
            new_pass,
        } = req.body
        try {
            const validatePw = bcrypt.compareSync(current_pass, password);
            if (!validatePw) return failed(res, USER_MESS.USER_PASSWORD_MISSING)
            const newPassword = await bcrypt.hash(new_pass, 8)
            await userModel.findOneAndUpdate({
                _id: user_id
            }, {
                password: newPassword
            })
            return success(res, COMMON_MESS.SUCCESS)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    updateLocation: async (req, res) => {
        const {
            _id: user_id
        } = req.user
        const {
            des_lat,
            des_long,
        } = req.body
        try {
            const newData = await userModel.findOneAndUpdate({
                _id: user_id
            }, {
                des_lat,
                des_long,
            }, {
                new: true
            })
            return success(res, newData)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    adminListUser: async (req, res) => {
        const {
            limit = '10', page = '1'
        } = req.query
        const offset = (parseInt(page) - 1) * parseInt(limit)
        try {
            const users = await userModel.find().limit(parseInt(limit)).skip(offset)
            const total = await userModel.countDocuments()
            return success(res, {
                total,
                users
            })
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    }
}
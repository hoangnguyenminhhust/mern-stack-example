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
    roadModel
} = require('../models/road.model')
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
const axios = require('axios')
module.exports = {

    getOrderNear: async (req, res) => {
        const {
         user_id
        } = req.params
        try {
            const dataUser = await userModel.findOne({
                _id: user_id
            })
            const orderList = await roadModel.find({
                status: 'ACCEPT'
            })
            let result = []
            for (let i = 0; i < orderList.length; i++) {
                let url = `http://103.141.144.200:7117/route/v1/driving/${dataUser.des_long},${dataUser.des_lat};${orderList[i].longitude},${orderList[i].latitude}?steps=false&exclude=motorway`
                console.log('driving.url', url)
                const response = await axios.get(url)
                if (response.data.routes[0].distance < 5000)
                    result.push(orderList[i])

            }
            return success(res, result)
        } catch (error) {
            console.log(error)
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    userGetProfile: async (req, res) => {
        const {
            _id: user_id
        } = req.user
        try {
            const dataUser = await userModel.findOne({
                _id: user_id
            })
            return success(res, dataUser)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },


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
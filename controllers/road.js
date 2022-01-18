const {
    roadModel
} = require('../models/road.model')
const {
    imageModel
} = require('../models/image.model')
const {
    failed,
    success,
    catchExp
} = require('../helper/response')
const {
    ROAD_MESS,
    COMMON_MESS
} = require('../helper/message')
const {
    userModel
} = require('../models/user.model')
module.exports = {
    createBOL: async (req, res) => {
        const {
            target_from,
            target_to,
            bill_price,
            payable_price,
            customer,
            description,
            latitude,
            longitude,
        } = req.body
        const user = req.user
        try {
            const checkCurrentLoad = await roadModel.find({
                driver_id: user._id,
                status: 'RUNNING'
            })
            if (checkCurrentLoad.length > 0) {
                return failed(res, ROAD_MESS.ROAD_LIMIT_CREATED)
            }
            const newRoad = await roadModel.create({
                target_from,
                target_to,
                driver_id: user._id,
                status: 'WAIT',
                bill_price,
                payable_price,
                customer,
                description,
                latitude,
                longitude,
            })
            return success(res, newRoad)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    getBOL: async (req, res) => {
        const {
            road_id,
        } = req.params
        try {
            console.log(road_id)
            const road = await roadModel.findOne({
                _id: road_id
            })

            const user = await userModel.findOne({
                _id: road.driver_id
            })
            return success(res, {
                ...road._doc,
                user
            })
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    listBOL: async (req, res) => {
        const {
            type = 'ALL',
        } = req.query
        const user = req.user
        try {
            let filter = {
                driver_id: user._id,
            }
            if (type !== 'ALL') {
                filter = Object.assign(filter, {
                    status: type
                })
            }
            const listRoad = await roadModel.find(filter)
            const totalRoad = await roadModel.countDocuments(filter)
            return success(res, {
                total: totalRoad,
                data: listRoad
            })
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    updateStatusRoad: async (req, res) => {
        const {
            road_id
        } = req.params
        const {
            confirm = true
        } = req.body
        const user = req.user
        try {


            const existingRoad = await roadModel.findOne({
                _id: road_id,
                driver_id: user._id
            })
            if (existingRoad.status !== 'RUNNING') {
                const checkCurrentLoad = await roadModel.find({
                    _id: {
                        $ne: road_id
                    },
                    driver_id: user._id,
                    status: 'RUNNING'
                })
                if (checkCurrentLoad.length > 0) {
                    return failed(res, ROAD_MESS.ROAD_LIMIT_CREATED)
                }
            }
            let updateData = {
                status: generateNextStatus(existingRoad.status, confirm)
            }
            console.log(updateData)
            if (existingRoad.status === 'WAIT' && confirm === true) {
                updateData.start_time = new Date()
                updateData.report_time = new Date()
            }
            if (existingRoad.status === 'RUNNING' && confirm === true) {
                updateData.end_time = new Date()
            }
            if (['SUCCESS', 'FAILED'].includes(existingRoad.status)) {
                return failed(res, ROAD_MESS.ROAD_UPDATE_STATUS)
            }
            if (!existingRoad) {
                return failed(res, ROAD_MESS.ROAD_NOT_EXIST)
            }
            const newRoad = await roadModel.findOneAndUpdate({
                _id: road_id,
            }, updateData, {
                new: true
            })
            return success(res, newRoad)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    uploadSignatral: async function (req, res, next) {
        const {
            _id: user_id
        } = req.user
        const {
            originalname,
            encoding,
            mimetype,
            destination,
            filename,
            path
        } = req.file
        const {
            road_id
        } = req.params
        try {
            const newImage = await imageModel.create({
                image_name: originalname,
                encoding,
                mimetype,
                destination,
                filename,
                path,
                user_id,
                road_id
            })
            await roadModel.findOneAndUpdate({
                _id: road_id
            }, {
                is_sign: true
            })
            return success(res, newImage)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    updateInfo: async (req, res) => {
        const {
            target_from,
            target_to,
            bill_price,
            payable_price,
            customer,
            description
        } = req.body
        const {
            road_id
        } = req.params
        const user = req.user
        try {
            let updateData = {}
            if (target_from) {
                updateData.target_from = target_from
            }
            if (target_to) {
                updateData.target_to = target_to
            }
            if (bill_price) {
                updateData.bill_price = bill_price
            }
            if (payable_price) {
                updateData.payable_price = payable_price
            }
            if (description) {
                updateData.description = description
            }
            const existingRoad = await roadModel.findOne({
                _id: road_id,
                driver_id: user._id
            })
            if (!existingRoad) {
                return failed(res, ROAD_MESS.ROAD_NOT_EXIST)
            }
            await roadModel.findOneAndUpdate({
                _id: road_id
            }, updateData)
            return success(res, "Thành công")

        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    adminOverView: async (req, res) => {
        try {

            const countUsers = await userModel.countDocuments({
                role_code: 4
            })
            const countOrderDeliveried = await roadModel.countDocuments({
                status: "SUCCESS"
            })
            const countOrderDelivering = await roadModel.countDocuments({
                status: "RUNNING"
            })
            const countOrderPending = await roadModel.countDocuments({
                status: "CREATED"
            })

            return success(res, {
                user: countUsers,
                deliveried: countOrderDeliveried,
                delivering: countOrderDelivering,
                pending: countOrderPending
            })

        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },

    adminListBOL: async (req, res) => {
        const {
            limit = '10', page = '1'
        } = req.query
        const offset = (parseInt(page) - 1) * parseInt(limit)
        try {
            const countOrder = await roadModel.countDocuments({
                status: {
                    $in: ["WAIT"]
                }
            })
            const listOderder = await roadModel.find({
                status: {
                    $in: ["WAIT"]
                }
            }).limit(parseInt(limit)).skip(offset)

            return success(res, {
                total: countOrder,
                orders: listOderder,
            })

        } catch (error) {
            console.log(error)
            return catchExp(res, COMMON_MESS.ERROR)
        }
    }
}

const generateNextStatus = (current, check) => {
    console.log(current, check)
    let newStatus = ''
    switch (current) {
        case 'WAIT':
            if (check) {
                newStatus = 'RUNNING'
            } else
                newStatus = 'FAILED'
            break;
        case 'RUNNING':
            if (check) {
                newStatus = 'SUCCESS'
            } else
                newStatus = 'FAILED'
            break;
    }
    return newStatus
}
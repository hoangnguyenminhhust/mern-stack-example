const {
    roadModel
} = require('../models/road.model')
const {
    failed,
    success,
    catchExp
} = require('../helper/response')
const {
    ROAD_MESS,
    COMMON_MESS
} = require('../helper/message')
const {userModel} = require('../models/user.model')
module.exports = {
    createBOL: async (req, res) => {
        const {
            target_from,
            target_to,
            bill_price,
            payable_price,
            customer,
            description
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
                description
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
    }

}

const generateNextStatus = (current, check) => {
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
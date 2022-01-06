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
module.exports = {
    createBOL: async (req, res) => {
        const {
            target_from,
            target_to,
            bill_price,
            payable_price
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
            })
            return success(res, newRoad)
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
            let updateData = {
                status: generateNextStatus(existingRoad.status, confirm)
            }
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
const {
    truckModel
} = require('../models/truck.model')
const {
    failed,
    success,
    catchExp
} = require('../helper/response')
const {
    TRUCK_MESS,
    COMMON_MESS
} = require('../helper/message')
module.exports = {
    createTruck: async (req, res) => {
        const {
            type,
            description
        } = req.body
        try {
            const checkCurrentTruck = await truckModel.findOne({
                type
            })
            if (checkCurrentTruck) {
                return failed(res, TRUCK_MESS.TRUCK_EXISTING)
            }
            const newTruck = await truckModel.create({
                type, description
            })
            return success(res, newTruck)
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },
    listTruck: async (req, res) => {
        try {
            const listTruck = await truckModel.find({})
            const totalTruck = await truckModel.countDocuments({})
            return success(res, {
                total: totalTruck,
                data: listTruck
            })
        } catch (error) {
            return catchExp(res, COMMON_MESS.ERROR)
        }
    },
}
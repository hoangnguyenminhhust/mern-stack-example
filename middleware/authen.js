const {
    verify
} = require('jsonwebtoken');
const {
    AUTHEN_MESS
} = require('../helper/message')
const {
    jwtSecret
} = require('../config/index')
const {
    userModel
} = require('../models/user.model')
module.exports = {
    authenGuard: async (req, res, next) => {
        const bearHeader = req.headers['authorization'] || false;
        try {
            if (bearHeader) {
                const token = bearHeader.split(' ')[1] || '';

                const decoded = await verify(token, jwtSecret);
                const user = await userModel.findOne({
                    _id: decoded.user_id
                })
                req.user = user
                next();
            } else {
                if (err) return res.status(401).send({
                    success: false,
                    code: 401,
                    data: AUTHEN_MESS.TOKEN_EMPTY
                })
            }
        } catch (error) {
            res.status(401).send({
                success: false,
                code: 401,
                data: AUTHEN_MESS.TOKEN_VALIDATE_FAILED
            })
        }

    }
}
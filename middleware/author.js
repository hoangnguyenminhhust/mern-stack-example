const {
    AUTHOR_MESS
} = require('../helper/message')

const {
    roleModel
} = require('../models/role.model');

module.exports = {
    authorGuard: async (req, res, next, per) => {
        const {
            role_code
        } = req.user
        try {
            const {
                role_type: Role
            } = await roleModel.findOne({
                role_code
            })
            if (per.includes(Role)) {
                next();
            } else
                res.status(403).send({
                    success: false,
                    code: 403,
                    data: AUTHOR_MESS.USER_NOT_PERMITTED
                })
        } catch (error) {
            res.status(403).send({
                success: false,
                code: 403,
                data: AUTHOR_MESS.USER_CHECK_PERMITTED_FAILED
            })
        }
    }
}
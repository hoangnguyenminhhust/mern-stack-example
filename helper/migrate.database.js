const {
    createUserIfNotFound
} = require('../models/user.model')
const {
    createRoleIfNotFound
} = require('../models/role.model')
const roleTypes = ['ADMIN', 'MANAGER', 'CUSTOMER', 'DRIVER', 'NOT_APPROVE']
const userMigrate = [{
        username: 'admin',
        password: '12345678',
        phone: '0337834333',
        role_code: 0
    },
    {
        username: 'manager',
        password: '12345678',
        phone: '0337834334',
        role_code: 0
    }, {
        username: 'customer',
        password: '12345678',
        phone: '0337834335',
        role_code: 0
    }, {
        username: 'driver',
        password: '12345678',
        phone: '0337834336',
        role_code: 0
    }, {
        username: 'freeuser',
        password: '12345678',
        phone: '0337834337',
        role_code: 0
    }
]
module.exports = {
    migrateDatabase: async () => {
        try {
            await Promise.all([...roleTypes.map((role, index) => {
                return createRoleIfNotFound({
                    role_type: role,
                    role_code: index
                })
            }), ...userMigrate.map((user) => {
                return createUserIfNotFound(user)
            })])
        } catch (error) {
            console.log(error);
        }
    }
}
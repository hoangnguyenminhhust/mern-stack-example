const express = require('express');
const {
    createTruck, listTruck
} = require('../controllers/truck');
const {
    authenGuard
} = require('../middleware/authen');

const {
    authorGuard
} = require('../middleware/author');

const router = express.Router();

router.post('/', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN', 'NOT_APPROVE'])
}, createTruck)

router.get('/', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN', 'NOT_APPROVE'])
}, listTruck)



module.exports = router
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
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, createTruck)

router.get('/', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, listTruck)



module.exports = router
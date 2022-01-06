const express = require('express');
const {
    createBOL,
    listBOL,
    updateStatusRoad,
    updateInfo,
    getBOL
} = require('../controllers/road');
const {
    authenGuard
} = require('../middleware/authen');

const {
    authorGuard
} = require('../middleware/author');

const router = express.Router();

router.post('/', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, createBOL)


router.get('/', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, listBOL)

router.get('/:road_id', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, getBOL)


router.put('/:road_id/status', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, updateStatusRoad)

router.put('/:road_id', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, updateInfo)

module.exports = router
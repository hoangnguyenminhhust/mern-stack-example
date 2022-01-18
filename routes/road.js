const express = require('express');
const multer = require('multer')
const upload = multer({
    dest: 'public/image/'
})
const {
    createBOL,
    listBOL,
    updateStatusRoad,
    uploadSignatral,
    updateInfo,
    getBOL,
    adminOverView,
    adminListBOL
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

router.post('/:road_id/upload/signal', authenGuard, upload.single('avatar'), uploadSignatral)

router.put('/:road_id', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, updateInfo)

// ADmin routes

router.get('/admin/overview', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN'])
}, adminOverView)

router.get('/admin/bol', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN'])
}, adminListBOL)

module.exports = router
const express = require('express');
const {
    updateSelfInfo,
    changePass,
    updateLocation,
    adminListUser,
    userGetProfile,
    getOrderNear
} = require('../controllers/user');
const {
    authenGuard
} = require('../middleware/authen');
const {
    authorGuard
} = require('../middleware/author');


const router = express.Router();

router.put('/update-self-info', authenGuard, updateSelfInfo)

router.put('/change-pass' , authenGuard, changePass)

router.put('/update-location' , authenGuard, updateLocation)

router.get('/self-info' , authenGuard, userGetProfile)

router.get('/:user_id/get-order-near' , authenGuard, getOrderNear)
// Admin routes

router.get('/admin', authenGuard,(req, res, next) => {
    authorGuard(req, res, next, ['ADMIN'])
}  , adminListUser )
module.exports = router
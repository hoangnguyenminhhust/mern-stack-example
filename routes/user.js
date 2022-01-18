const express = require('express');
const {
    updateSelfInfo,
    changePass,
    updateLocation,
    adminListUser
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

// Admin routes

router.get('/admin', authenGuard,(req, res, next) => {
    authorGuard(req, res, next, ['ADMIN'])
}  , adminListUser )
module.exports = router
const express = require('express');
const {
    updateSelfInfo,
    changePass,
    updateLocation
} = require('../controllers/user');
const {
    authenGuard
} = require('../middleware/authen');

const router = express.Router();

router.put('/update-self-info', authenGuard, updateSelfInfo)

router.put('/change-pass' , authenGuard, changePass)

router.put('/update-location' , authenGuard, updateLocation)
module.exports = router
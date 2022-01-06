const express = require('express');
const {
    login,
    signUp,
    requestResetPass,
    confirmOtp,
    confirmNewPassword
} = require('../controllers');
const {
    authenGuard
} = require('../middleware/authen');

const {
    authorGuard
} = require('../middleware/author');

const router = express.Router();

router.post('/login', login)

router.post('/signup', signUp)

router.post('/reset-password', requestResetPass)

router.post('/confirm-otp', confirmOtp)

router.post('/confirm-new-password', authenGuard, (req, res, next) => {
    authorGuard(req, res, next, ['ADMIN','DRIVER'])
}, confirmNewPassword)

module.exports = router
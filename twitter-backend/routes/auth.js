const express = require('express');
const router = express.Router();

const {
    signup,
    signin,
    getOtherUsers,
    followUser
} = require('../controller/auth');

const {
    userSignupValidator,
    userSigninValidator,
} = require('../validators/auth');
const { runValidation } = require('../validators');


router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/getOtherUsers/:userid', getOtherUsers);
router.post('/follow-user',followUser);


module.exports = router;
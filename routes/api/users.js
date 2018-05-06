const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const register = require('../service-handler/users-handler');
const userLogin = require('../service-handler/users-handler');
//Load User model
const User = require('../../models/User');

// @desc user registration
// @required name , email , password
router.route('/register').post(register);

// @desc Login User / Returning JWT Token
router.route('/login').post(userLogin);

module.exports = router;

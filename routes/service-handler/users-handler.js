const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load User model
const User = require('../../models/User');

module.exports = register = function register(req, res) {
  const {name, email, password} = req.body;
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({email: 'email already exists'});
      } else {
        const newUser = new User({
          name,
          email,
          avatar,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => logger.info(err));
};

module.exports = userLogin = function userLogin(req, res) {
  const {email, password} = req.body;

  // find user by email
  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({email: 'User not found'});
      }

      const {id, name, avatar} = user;

      //check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          const payload = {id, name, avatar}; // create JWT payload
          // Sign Token
          jwt.sign(payload, keys.secretKey, {expiresIn: 3600}, (err, token) => {
            res.json({success: true, token: 'Bearer ' + token});
          });
        } else {
          return res.status(400).json({password: 'password incorrect'});
        }
      });
    })
    .catch(err => console.log(err));
};

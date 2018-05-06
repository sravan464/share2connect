const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//Load User model
const User = require('../../models/User');

// @desc user registration
// @required name , email , password
router.route('/register').post(register);

function register(req, res) {
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
}

// @desc Login User / Returning JWT Token
router.route('/login').post(userLogin);

function userLogin(req, res) {
  const {email, password} = req.body;

  // find user by email
  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({email: 'User not found'});
      }

      //check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          res.json({msg: 'success'});
        } else {
          return res.status(400).json({password: 'password incorrect'});
        }
      });
    })
    .catch(err => console.log(err));
}

module.exports = router;

const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//Load User model
const User = require('../../models/User');

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

module.exports = router;

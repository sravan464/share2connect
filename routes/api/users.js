const router = require('express').Router();

//Load User model
const User = require('../../models/User');

// router.route('/test').get(getAllUsers);

// function getAllUsers(req, res) {
//   res.json({ msg: 'hello from all users' });
// }

router.route('/register').post(register);
function register(req, res) {
  const {name, email, password} = req.body;
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
      }
    })
    .catch(err => logger.info(err));
}

module.exports = router;

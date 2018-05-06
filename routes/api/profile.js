const router = require('express').Router();

router.route('/test').get(getAllUsers);

function getAllUsers(req, res) {
  res.json({ msg: 'hello from all profiles' });
}

module.exports = router;

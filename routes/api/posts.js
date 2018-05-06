const router = require('express').Router();

router.route('/test').get(getAllUsers);
function getAllUsers(req, res) {
  res.json({ msg: 'hello from all posts' });
}

router.route('/test/:id').get(getUser);

function getUser(req, res) {
  res.json({ msg: req.params.id });
}

module.exports = router;

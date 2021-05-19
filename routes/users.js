const router = require('express').Router();

const getUsers = (req, res) => {

};

const getUser = (req, res) => {
  const {userId} = req.params;
};

const createUser = (req, res) => {
  const {title, name, avatar} = req.query;
};

const updateProfile = (req, res) => {
  //req.user._id
};

const updateAvatar = (req, res) => {
  //req.user._id
  const {title, name, avatar} = req.query;
};

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
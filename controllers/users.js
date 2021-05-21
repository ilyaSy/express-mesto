const User = require('../models/user');

const ERROR_BAD_DATA = 400;
const ERROR_NO_DATA = 404;
const ERROR_OTHER = 400;

const handleError = (res, err) => {
  if (err.message === 'NotFound') {
    return res.status(ERROR_NO_DATA).send({ message: 'Пользователь не найден' });
  }
  if (err.name === 'CastError') {
    return res.status(ERROR_BAD_DATA).send({ message: 'Переданы некорректные данные' });
  }
  return res.status(ERROR_OTHER).send({ message: `На сервере произошла ошибка: ${err}` });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(res, err));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => { throw Error('NotFound'); })
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err));
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err));
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err));
};

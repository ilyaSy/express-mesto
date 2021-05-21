const Card = require('../models/card');

const ERROR_BAD_DATA = 400;
const ERROR_NO_DATA = 404;
const ERROR_OTHER = 400;

const handleError = (res, err) => {
  if (err.name === 'ValidationError') {
    return res.status(ERROR_BAD_DATA).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(ERROR_NO_DATA).send({ message: 'Карточка не найдена' });
  }
  return res.status(ERROR_OTHER).send({ message: `На сервере произошла ошибка: ${err}` });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleError(res, err));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send(card))
    .catch((err) => handleError(res, err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) => handleError(res, err));
};

module.exports.toggleLikeCard = (req, res) => {
  const { cardId } = req.params;

  if (req.method === 'PUT') {
    Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => res.send(card))
      .catch((err) => handleError(res, err));
  } else if (req.method === 'DELETE') {
    Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => res.send(card))
      .catch((err) => handleError(res, err));
  }
};

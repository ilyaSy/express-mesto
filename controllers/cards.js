const Card = require('../models/card');
const CustomError = require('../utils/CustomError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error('NoData'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'NoData') {
        throw new CustomError(404, 'Карточка не найдена');
      } else if (err.name === 'CastError') {
        throw new CustomError(400, 'Переданы некорректные данные');
      }
      throw new CustomError(500, 'На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'NoData') {
        throw new CustomError(404, 'Карточка не найдена');
      } else if (err.name === 'CastError') {
        throw new CustomError(400, 'Переданы некорректные данные');
      }
      throw new CustomError(500, 'На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.toggleLikeCard = (req, res, next) => {
  const { cardId } = req.params;

  if (req.method === 'PUT') {
    Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .orFail(new Error('NoData'))
      .then((card) => res.send(card))
      .catch((err) => {
        if (err.message === 'NoData') {
          throw new CustomError(404, 'Карточка не найдена');
        } else if (err.name === 'CastError') {
          throw new CustomError(400, 'Переданы некорректные данные');
        }
        throw new CustomError(500, 'На сервере произошла ошибка');
      })
      .catch(next);
  } else if (req.method === 'DELETE') {
    Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
      .orFail(new Error('NoData'))
      .then((card) => res.send(card))
      .catch((err) => {
        if (err.message === 'NoData') {
          throw new CustomError(404, 'Карточка не найдена');
        } else if (err.name === 'CastError') {
          throw new CustomError(400, 'Переданы некорректные данные');
        }
        throw new CustomError(500, 'На сервере произошла ошибка');
      })
      .catch(next);
  }
};

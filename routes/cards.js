const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  toggleLikeCard,
} = require('../controllers/cards');

router.get('/cards', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), getCards);

router.post('/cards', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), toggleLikeCard);

router.delete('/cards/:cardId/likes', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), toggleLikeCard);

module.exports = router;

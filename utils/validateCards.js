const { Joi, celebrate, errors } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  toggleLikeCard,
} = require('../controllers/cards');
const cardsRoutes = require('../routes/cards');

cardsRoutes.get('/cards', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), getCards);

cardsRoutes.post('/cards', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required.min(2).max(30),
    link: Joi.string().required,
  }),
}), createCard);

cardsRoutes.delete('/cards/:cardId', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required.length(20),
  }),
}), deleteCard);

cardsRoutes.put('/cards/:cardId/likes', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required.length(20),
  }),
}), toggleLikeCard);

cardsRoutes.delete('/cards/:cardId/likes', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required.length(20),
  }),
}), toggleLikeCard);
cardsRoutes.use(errors());

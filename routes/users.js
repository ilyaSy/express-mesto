const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    qwerty: Joi.string().required(),
  }),
}), getUsers);

router.get('/users/:userId', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), getUser);

router.get('/users/me', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), getMe);

router.patch('/users/me', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = router;

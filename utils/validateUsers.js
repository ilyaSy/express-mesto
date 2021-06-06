const { Joi, celebrate, errors } = require('celebrate');

const {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const usersRoutes = require('../routes/users');

usersRoutes.get('/users', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), getUsers);

usersRoutes.get('/users/:userId', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    userId: Joi.string().required.length(20),
  }),
}), getUser);

usersRoutes.get('/users/me', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), getMe);

usersRoutes.patch('/users/me', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required.min(2).max(30),
    about: Joi.string().required.min(2).max(30),
  }),
}), updateProfile);

usersRoutes.patch('/users/me/avatar', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().required,
  }),
}), updateAvatar);
usersRoutes.use(errors());

usersRoutes.patch('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required,
    password: Joi.string().required,
  }),
}), updateAvatar);
usersRoutes.use(errors());

usersRoutes.patch('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string(),
    email: Joi.string().required,
    password: Joi.string().required,
  }),
}), updateAvatar);
usersRoutes.use(errors());

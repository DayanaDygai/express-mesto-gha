/* eslint-disable import/no-unresolved */
import { Router } from 'express';
// eslint-disable-next-line import/extensions
import userRouter from './users.js';
// eslint-disable-next-line import/extensions
import cardRouter from './cards.js';
// eslint-disable-next-line import/extensions
import auth from '../middleware/auth.js';

// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { celebrate, Joi } from 'celebrate';

// eslint-disable-next-line import/extensions
import { login, createUser } from '../controllers/users.js';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.post('/signin', auth, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&`()*+,;=]+#?/,
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

export default router;

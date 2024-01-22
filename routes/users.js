/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUserById,
  getUsers,
  editInfoUser,
  editAvatarUser,
  // eslint-disable-next-line import/named
  getMyProfile,
// eslint-disable-next-line import/extensions
} from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getMyProfile);

userRouter.get('/:userId', getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editInfoUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(
      /^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&`()*+,;=]+#?/,
    ),
  }),
}), editAvatarUser);

export default userRouter;

import { Router } from 'express';
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

userRouter.patch('/me', editInfoUser);

userRouter.patch('/me/avatar', editAvatarUser);

export default userRouter;

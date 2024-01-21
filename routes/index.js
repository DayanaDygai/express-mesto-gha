import { Router } from 'express';
// eslint-disable-next-line import/extensions
import userRouter from './users.js';
// eslint-disable-next-line import/extensions
import cardRouter from './cards.js';
// eslint-disable-next-line import/extensions

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

export default router;

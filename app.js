/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { celebrate, Joi, errors } from 'celebrate';

import dotenv from 'dotenv';

import router from './routes/index.js';

import handlerError from './middleware/handlerError.js';

// eslint-disable-next-line import/no-unresolved
import auth from './middleware/auth.js';

dotenv.config();

// eslint-disable-next-line import/first
import { login, createUser } from './controllers/users.js';

const NOT_FOUND_ERROR = 404;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
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

app.use(auth);
app.use(router);

app.use('*', (req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Страницы не существуе' }));
app.use(errors());
app.use(handlerError);

app.listen(3000);

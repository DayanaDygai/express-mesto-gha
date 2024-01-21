/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(router);

app.use('*', (req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Страницы не существует' }));
app.use(handlerError);

app.listen(3000);

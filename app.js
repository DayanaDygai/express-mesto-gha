import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/extensions
import router from './routes/index';

const NOT_FOUND_ERROR = 404;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '65a004911a89b42e39df9783', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);

app.use('*', (req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Страницы не существует' }));

app.listen(3000, () => {
  console.log('Server listen port 3000');
});

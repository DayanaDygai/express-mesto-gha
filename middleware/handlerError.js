// eslint-disable-next-line func-names
export default function (error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const errorMessage = statusCode === 500 ? 'Ошибка сервера' : error.message;
  res.status(statusCode).send({ message: errorMessage });
  next();
}

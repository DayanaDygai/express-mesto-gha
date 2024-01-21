/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line func-names
export default function (req, res, next) {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('NotAuthanticate');
    }
    const validToken = token.replace('Bearer ', '');

    payload = jwt.verify(validToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    if (error.mesage === 'NotAuthanticate') {
      return res.status(401).send({ message: 'Неправильные email или пароль' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'С токеном что-то не так' });
    }
    return res.status(500).send(error);
  }

  req.user = payload;
  next();
}

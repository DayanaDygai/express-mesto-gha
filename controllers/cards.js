import Card from '../models/Card';

const INCORRECT_DATA = 400;
// eslint-disable-next-line max-len
// переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
const NOT_FOUND_ERROR = 404;
// карточка или пользователь не найден
const SERVER_ERROR = 500;
// oшибка по-умолчанию

const STATUS_OK = 200;
// запрос успешно выполнен

const STATUS_OK_CREATED = 201;
// запрос выполнен и создан новый ресурс

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK).send({ cards });
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .send({ message: 'ошибка на стороне сервера' });
  }
};

export const createCard = async (req, res) => {
  try {
    const card = await Card.create({ ...req.body, owner: req.user._id });
    return res.status(STATUS_OK_CREATED).send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(INCORRECT_DATA).send({
        message: 'Переданны не валидные данные',
      });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: 'ошибка на стороне сервера' });
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const owner = req.user._id;
    const card = await Card.findById(cardId);
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Карточки с указанным ID не существует' });
    }
    if (card.owner.toString() !== owner) {
      return res
        .status(INCORRECT_DATA)
        .send({ message: 'Нет прав для удаления карточки' });
    }
    const deletedCard = await Card.deleteOne({ _id: cardId });
    return res.status(STATUS_OK).send({ deletedCard });
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(INCORRECT_DATA)
        .send({ message: 'Указан не корректный ID' });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: 'ошибка на стороне сервера' });
  }
};

export const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new Error('NotFoundError'));
    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Пользователь по указанному ID не найден' });
    }
    if (error.name === 'CastError') {
      return res
        .status(INCORRECT_DATA)
        .send({ message: 'Передан некорректный ID' });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: 'ошибка на стороне сервера' });
  }
};

export const deleteLikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new Error('NotFoundError'));
    return res.status(STATUS_OK).send({ card });
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Пользователь по указанному ID не найден' });
    }
    if (error.name === 'CastError') {
      return res
        .status(INCORRECT_DATA)
        .send({ message: 'Передан некорректный ID' });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: 'ошибка на стороне сервера' });
  }
};

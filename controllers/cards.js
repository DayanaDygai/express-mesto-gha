import Card from "../models/Card.js";

const INCORRECT_DATA = 400;
// переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
const NOT_FOUND_ERROR = 404;
// карточка или пользователь не найден
const SERVER_ERROR = 500;
// oшибка по-умолчанию

const STATUS_OK = 200;
//запрос успешно выполнен

const STATUS_OK_CREATED = 201;
//запрос выполнен и создан новый ресурс

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK).send({cards});
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(INCORRECT_DATA)
        .send({
          message: "Переданны не валидные данные",
          error: error.message,
        });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};

export const createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    return res.status(STATUS_OK_CREATED).send({
      name: card.name,
      link: card.link,
      owner: card.owner,});
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(INCORRECT_DATA)
        .send({
          message: "Переданны не валидные данные"
        });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const { CardId } = req.params;
    const deletedCard = await Card.deleteOne(CardId).orFail(
      () => new Error("NotFoundError"));
    return res.status(OK).send({ deletedCard });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(INCORRECT_DATA).send({ message: error.message });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};

export const likeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes:req.user._id } },
      { new: true },
    ).orFail(() => new Error("NotFoundError"));
    return res.status(STATUS_OK).send(likes);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: "Пользователь по указанному ID не найден" });;
    }
    if (error.name === "CastError") {
      return res.status(INCORRECT_DATA).send({ message: "Передан некорректный ID" });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};

export const deleteLikeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: owner } },
      { new: true },
    ).orFail(() => new Error(NOT_FOUND_ERROR));
    return res.status(STATUS_OK).send(likes);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res
        .status(INCORRECT_DATA)
        .send({ message: "Пользователь по указанному ID не найден" });;
    }
    if (error.name === "CastError") {
      return res.status(NOT_FOUND_ERROR).send({ message: "Передан некорректный ID" });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};


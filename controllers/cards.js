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
    const card = await Card.create({ name, link, owner }).findById(card._id);
    return res.status(STATUS_OK_CREATED).send({
      name: card.name,
      link: card.link,
      owner: card._id});
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
      () => new Error(NOT_FOUND_ERROR));
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
    const owner = req.user._id;
    const { CardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      CardId,
      { $addToSet: { likes: owner } },
      { new: true },
    ).orFail(() => new Error(NOT_FOUND_ERROR));

    return res.status(STATUS_OK).send({card});
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(INCORRECT_DATA).send({ message: error.message });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};

export const deleteLikeCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { CardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      CardId,
      { $pull: { likes: owner } },
      { new: true },
    ).orFail(() => new Error("NotFoundError"));
    return res.status(STATUS_OK).send({ card });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(INCORRECT_DATA).send({ message: error.message });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};



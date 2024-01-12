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
    return res.status(STATUS_OK).send(cards);
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
    const { name, link } = req.body;
    const createCard = await Card.create({ name, link, owner: req.user._id })
      .findById(card._id)
      .populate("owner");
    return res.status(STATUS_OK_CREATED).send(createCard);
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

export const deleteCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).orFail(
      () => new Error(NOT_FOUND_ERROR),
    );
    return res.status(STATUS_OK).send({ message: `${card} удалена` });
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
    const cardLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new Error(NOT_FOUND_ERROR));
    return res.status(STATUS_OK).send({ message: `${cardLike} поставлен` });
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
    const deleteLikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new Error(NOT_FOUND_ERROR));
    return res.status(STATUS_OK).send({ message: `${deleteLikeCard} удален` });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(INCORRECT_DATA).send({ message: error.message });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "ошибка на стороне сервера" });
  }
};

// module.exports.createCard = (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };

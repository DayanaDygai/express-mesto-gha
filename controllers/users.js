import User from "../models/User.js";
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require("http2").constants;

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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(STATUS_OK).send(users);
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .send({ message: "Ошибка на стороне сервера" });
  }
};

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: "Пользователь с таким ID не найден" });
        return;
      }
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.mssage })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error}` })
    );
};



export const createUser = async (req, res) => {
  try {
    const { _id, name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar, _id });
    return res.status(STATUS_OK_CREATED).send(user);
  } catch (error) {
    if (error.message === "ValidationError") {
      return res
        .status(INCORRECT_DATA)
        .send({
          message: "Некорректные данные"
        });
    }
    if (error.code === MONGO_DUPLICATE_ERROR) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({
          message: "Такой пользовательно уже существует"
        });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "Ошибка на стороне сервера" });
  }
};

export const editInfoUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => new Error("NotFoundError"));
    return res.status(STATUS_OK).send({name: user.name,
      about: user.about,});
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
      .send({ message: "Ошибка на стороне сервера" });
  }
};

export const editAvatarUser = async (req, res) => {
  try {
    const { avatar } = req.body.avatar;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: "true", runValidators: true },
    ).orFail(() => new Error("NotFoundError"));
    return res.status(STATUS_OK).send({ avatar: user.avatar });
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
      .send({ message: "Ошибка на стороне сервера" });
  }
};

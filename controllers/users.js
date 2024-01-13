import User from "../models/User.js";

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

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      () => new Error("NotFoundError"),
    )
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: "Пользователь по указанному ID не найден" });
    }

    if (error.name === "CastError") {
      return res
        .status(INCORRECT_DATA)
        .send({ message: "Передан не валидный ID" });
    }

    return res
      .status(SERVER_ERROR)
      .send({ message: "Ошибка на стороне сервера" });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(STATUS_OK_CREATED).send(newUser);
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
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: "true", runValidators: true },
    ).orFail(() => new Error("NotFoundError"));
    return res.status(STATUS_OKD).send({avatar: user.avatar});
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
import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import mongoose from "mongoose";

const NOT_FOUND_ERROR = 404;

const { PORT, MONGO_URL } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "65a004911a89b42e39df9783", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);

app.use("*", (req, res) =>
  res.status(NOT_FOUND_ERRO).send({ message: "Страницы не существует" })
);

app.listen(3000, () => {
  console.log(`Server listen port ${PORT}`);
});
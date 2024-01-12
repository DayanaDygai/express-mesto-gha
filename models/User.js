import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "минимальная длинна 2 символа"],
      maxlength: [30, "максимальная длинна 30 символов"],
    },
    about: {
      type: String,
      required: true,
      minlength: [2, "минимальная длинна 2 символа"],
      maxlength: [30, "максимальная длинна 30 символов"],
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {},
);

export default mongoose.model("user", userSchema);

// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
// avatar — ссылка на аватарку, строка,
//  обязательное поле.

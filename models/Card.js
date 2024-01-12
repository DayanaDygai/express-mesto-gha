import mongoose,  { Schema }  from "mongoose";

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "минимальная длинна 2 символа"],
      maxlength: [30, "максимальная длинна 30 символов"],
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "user" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {},
);

export default mongoose.model("card", cardSchema);

// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
// avatar — ссылка на аватарку, строка,
//  обязательное поле.

// timestamp:true

// name — имя карточки, строка от 2 до 30 символов, обязательное поле;
// link — ссылка на картинку, строка, обязательно поле.
// owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
// likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
// createdAt — дата создания, тип Date, значение по умолчанию Date.now.
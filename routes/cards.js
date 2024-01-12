import { Router } from "express";
import {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  deleteLikeCard,
} from "../controllers/cards";

const cardRouter = Router();

cardRouter.get("/", getCards);

cardRouter.delete("/:cardId", deleteCardById);

cardRouter.post("/", createCard);

cardRouter.put("/:cardId/likes", likeCard);

cardRouter.delete("/:cardId/likes", deleteLikeCard);

export default cardRouter;

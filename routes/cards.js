import { Router } from "express";
import {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  deleteLikeCard,
} from "../controllers/cards.js";

const cardRouter = Router();

cardRouter.get("/", getCards);

cardRouter.delete("/:CardId", deleteCardById);

cardRouter.post("/", createCard);

cardRouter.put("/:CardId/likes", likeCard);

cardRouter.delete("/:CardId/likes", deleteLikeCard);

export default cardRouter;

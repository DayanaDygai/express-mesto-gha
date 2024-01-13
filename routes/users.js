import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  editInfoUser,
  editAvatarUser,
} from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:userId", getUserById);

userRouter.post("/", createUser);

userRouter.patch("/me", editInfoUser);

userRouter.patch("/me/avatar", editAvatarUser);

export default userRouter;
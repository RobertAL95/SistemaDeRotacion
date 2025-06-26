import { Router } from "express";
import { login, register } from "./controller";

const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.post("/register", register);

export { loginRouter };

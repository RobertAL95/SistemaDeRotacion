import { Router } from "express";
import { createDeliverer, listUsers } from "./controller";
import { authenticateToken } from "../../network/authMiddleware";
import { authorizeRoles } from "../../network/roleMiddleware";

const userRouter = Router();

// Crear entregador (solo supervisores)
userRouter.post("/", authenticateToken, authorizeRoles(["supervisor"]), createDeliverer);

// Ver usuarios (solo supervisores)
userRouter.get("/", authenticateToken, authorizeRoles(["supervisor"]), listUsers);

export { userRouter };

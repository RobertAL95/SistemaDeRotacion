import { Router } from "express";
import { createDelivery } from "./controller";
import { authenticateToken } from "../../network/authMiddleware"; // para proteger el endpoint

const deliveryRouter = Router();

// Proteger con autenticación
deliveryRouter.post("/", authenticateToken, createDelivery);

export { deliveryRouter };

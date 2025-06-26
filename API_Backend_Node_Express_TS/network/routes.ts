import { Router } from "express";
import { loginRouter } from "../services/Auth/network";
import { userRouter } from "../services/Users/network";
import { authenticateToken } from "./authMiddleware";

const router = Router();

router.use("/login", loginRouter);
router.use("/users", userRouter);


// Ruta protegida de ejemplo
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acceso autorizado a ruta protegida", user: (req as any).user });
});

export { router };

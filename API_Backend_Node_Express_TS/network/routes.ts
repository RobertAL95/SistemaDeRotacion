import { Router } from "express";
import { loginRouter } from "../services/login/network";
import { authenticateToken } from "./authMiddleware";

const router = Router();

router.use("/login", loginRouter);

// Ruta protegida de ejemplo
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acceso autorizado a ruta protegida", user: (req as any).user });
});

export { router };

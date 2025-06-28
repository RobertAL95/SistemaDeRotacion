import { Router } from "express";
import { loginRouter } from "../services/Auth/network";
import { userRouter } from "../services/Users/network";
import invitationRouter from "../services/Invitations/network"; // ✅ Importa el router completo
import { authenticateToken } from "./authMiddleware";

const router = Router();

// Rutas para login
router.use("/login", loginRouter);

// Rutas para usuarios
router.use("/users", userRouter);

// Rutas para invitaciones
router.use("/invitations", invitationRouter); // ✅ Monta el router de invitaciones

// Ejemplo de ruta protegida para probar autenticación
router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Acceso autorizado a ruta protegida",
    user: (req as any).user,
  });
});

export { router };

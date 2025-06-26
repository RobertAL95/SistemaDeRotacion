import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

/**
 * Middleware que permite el acceso solo si el usuario tiene al menos uno de los roles indicados.
 * @param allowedRoles Lista de roles válidos para acceder a la ruta
 */
export function authorizeRoles(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.roles) {
      return res.status(403).json({ error: "Acceso denegado: sin roles definidos" });
    }

    const hasAccess = user.roles.some((role: string) => allowedRoles.includes(role));
    if (!hasAccess) {
      return res.status(403).json({ error: "Acceso denegado: rol insuficiente" });
    }

    next();
  };
}

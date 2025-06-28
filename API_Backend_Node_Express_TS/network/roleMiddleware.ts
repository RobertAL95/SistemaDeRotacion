import { Request, Response, NextFunction } from "express";

export function authorizeRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.roles.some((role: string) => roles.includes(role))) {
      return res.status(403).json({ error: "Acceso denegado: rol insuficiente" });
    }

    next();
  };
}

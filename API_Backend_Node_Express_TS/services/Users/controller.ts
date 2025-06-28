import { Request, Response } from "express";
import { User, Role } from "./model";
import bcrypt from "bcrypt";

// Crear entregador (solo supervisores)
export async function createDeliverer(req: Request, res: Response) {
  try {
    const { username, password, roles } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Debe enviar username y password" });
    }

    // roles debe ser explícitamente ["entregador"]
    if (!roles || !Array.isArray(roles) || roles.length !== 1 || roles[0] !== "entregador") {
      return res.status(400).json({ error: "Debe asignar explícitamente el rol entregador en roles: [\"entregador\"]" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const authUser = (req as any).user;

    const newUser = new User({
      username,
      password: hashedPassword,
      roles,
      organizationId: authUser.organizationId, // asigna organización del supervisor
    });

    await newUser.save();

    return res.status(201).json({
      message: "Entregador creado correctamente",
      user: { username: newUser.username, roles: newUser.roles },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el entregador" });
  }
}

// Listar usuarios de la misma organización
export async function listUsers(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    const users = await User.find({ organizationId: authUser.organizationId }).select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}

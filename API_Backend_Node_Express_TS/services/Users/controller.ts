import { Request, Response } from "express";
import { User } from "./model";
import bcrypt from "bcrypt";

// Crear entregador (solo supervisor)
export async function createDeliverer(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      roles: ["entregador"], // Forzado
    });

    await newUser.save();

    return res.status(201).json({ message: "Entregador creado", user: { username: newUser.username, roles: newUser.roles } });
  } catch (error) {
    return res.status(500).json({ error: "Error al crear entregador" });
  }
}

// Listar usuarios (solo supervisores)
export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}

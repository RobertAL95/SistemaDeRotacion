import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Entregador } from "./model";

export const registrarEntregador = async (req: Request, res: Response) => {
  const { email, password, organizationId } = req.body;

  if (!email || !password || !organizationId) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    // Verificar si ya existe
    const existing = await Entregador.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoEntregador = new Entregador({
      email,
      password: hashedPassword,
      organizationId,
      role: "entregador",
    });

    await nuevoEntregador.save();

    res.status(201).json({ message: "Entregador registrado correctamente" });
  } catch (error) {
    console.error("Error en registrarEntregador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const accesoInvitacion = (req: Request, res: Response) => {
  const token = req.params.token;
  console.log(`Invitación accedida con token: ${token}`);

  // Aquí podrías hacer validación real del token, caducidad, etc.

  res.json({ message: `Invitación válida para token: ${token}` });
};

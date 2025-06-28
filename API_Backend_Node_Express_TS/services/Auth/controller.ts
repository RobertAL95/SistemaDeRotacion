import { Request, Response } from "express";
import { User } from "../Users/model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1h";

// Login
export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        roles: user.roles,
        organizationId: user.organizationId, // incluye organizationId en el token
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Registrar primer supervisor (crea organización)
export async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son obligatorios" });
    }

    // Chequear si existe al menos un usuario con rol supervisor
    const supervisorExists = await User.findOne({ roles: { $in: ["supervisor"] } });
    if (supervisorExists) {
      console.log("Supervisor existente:", supervisorExists.username, supervisorExists.organizationId);
      return res.status(403).json({ error: "Ya existe un supervisor registrado. Use login o invite entregadores." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOrganizationId = crypto.randomUUID();

    const newUser = new User({
      username,
      password: hashedPassword,
      roles: ["supervisor"],
      organizationId: newOrganizationId, // supervisor crea la organización
    });

    await newUser.save();

    return res.status(201).json({
      message: "Supervisor registrado correctamente",
      user: {
        username: newUser.username,
        roles: newUser.roles,
        organizationId: newUser.organizationId,
      },
    });
  } catch (error) {
    console.error("Error al registrar supervisor:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

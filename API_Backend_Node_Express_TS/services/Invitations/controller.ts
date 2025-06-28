import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../Users/model";
import { sendEmail } from "../utils/email";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Enviar invitación por correo
export async function sendInvitation(req: Request, res: Response) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username del entregador es obligatorio" });
    }

    const authUser = (req as any).user;

    const invitationToken = jwt.sign(
      {
        username,
        role: "entregador",
        organizationId: authUser.organizationId,
      },
      JWT_SECRET,
      { expiresIn: "48h" }
    );

    const invitationLink = `https://tuapp.com/register-deliverer?token=${invitationToken}`;

    await sendEmail(username, "Invitación para registrarte", `
      <p>¡Hola!</p>
      <p>Has sido invitado como entregador. Haz clic en el siguiente enlace para registrarte:</p>
      <a href="${invitationLink}">${invitationLink}</a>
      <p>Este enlace expirará en 48 horas.</p>
    `);

    return res.status(200).json({ message: "Invitación enviada correctamente" });
  } catch (error) {
    console.error("Error al enviar invitación:", error);
    return res.status(500).json({ error: "Error al enviar invitación" });
  }
}

// Aceptar invitación y registrar entregador
export async function acceptInvitation(req: Request, res: Response) {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token y password son requeridos" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      username: string;
      role: "entregador";
      organizationId: string;
    };

    const existingUser = await User.findOne({ username: decoded.username });
    if (existingUser) {
      return res.status(400).json({ error: "Este entregador ya fue registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: decoded.username,
      password: hashedPassword,
      roles: [decoded.role],
      organizationId: decoded.organizationId,
    });

    await newUser.save();

    return res.status(201).json({ message: "Entregador registrado correctamente" });
  } catch (error: any) {
    console.error("Error en aceptar invitación:", error);
    return res.status(400).json({ error: "Invitación inválida o expirada" });
  }
}

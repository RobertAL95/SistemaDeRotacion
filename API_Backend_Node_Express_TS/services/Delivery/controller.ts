import { Request, Response } from "express";
import { Delivery } from "./model";

// Guardar entrega al escanear QR
export async function createDelivery(req: Request, res: Response) {
  try {
    const { qrCode, location } = req.body;
    const entregadorId = (req as any).user?.id; // ⚠️ debes proteger la ruta con authMiddleware

    if (!qrCode || !location?.lat || !location?.lng) {
      return res.status(400).json({ error: "qrCode y location (lat, lng) son requeridos" });
    }

    const delivery = new Delivery({
      entregadorId,
      qrCode,
      location,
      deliveredAt: new Date(),
    });

    await delivery.save();

    return res.status(201).json({ message: "Entrega registrada correctamente", delivery });
  } catch (error) {
    console.error("Error creando entrega:", error);
    return res.status(500).json({ error: "Error registrando entrega" });
  }
}

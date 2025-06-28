import express from "express";
import mongoose from "mongoose";
import { router } from "./network/routes";
import dotenv from "dotenv";
import cors from "cors"; // ⬅️ agrega esto

dotenv.config();

const app = express();

// ✅ Configura CORS solo para tu frontend local
app.use(cors({
  origin: "http://localhost:5173", // Cambia a tu frontend si es otro puerto/dominio
  credentials: true // permite cookies/sesiones si las usas
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB", err);
  });

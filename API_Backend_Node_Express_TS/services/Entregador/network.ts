import { Router } from "express";
import { registrarEntregador, accesoInvitacion } from "./controller";

const router = Router();

router.get("/invitacion/:token", accesoInvitacion);

router.post("/registro-entregador", registrarEntregador);

export { router as entregadorRouter };

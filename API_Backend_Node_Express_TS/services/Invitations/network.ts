import { Router } from "express";
import { sendInvitation, acceptInvitation, acceptInvitationPage } from "./controller";
import { authenticateToken } from "../../network/authMiddleware";

const router = Router();

router.post("/send-invitation", authenticateToken, sendInvitation); // ✅ protegida
router.get("/accept", acceptInvitationPage); // link del email
router.post("/accept-invitation", acceptInvitation); // procesar el formulario

export default router;

import { Router } from "express";
import { sendInvitation, acceptInvitation } from "./controller";
import { authenticateToken } from "../../network/authMiddleware";

const router = Router();

router.post("/send", authenticateToken, sendInvitation);
router.post("/accept", acceptInvitation);

export default router;

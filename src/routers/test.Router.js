import { Router } from "express";
import { getResponse } from "../controllers/test.Controller.js";

const router = Router();


router.post("/chat", getResponse);

export default router;

import { Router } from "express";
import { getGeneralDoubts } from "../controllers/dashboard.controller";

const router = Router();

router.get("/general-doubts", getGeneralDoubts);

export default router;

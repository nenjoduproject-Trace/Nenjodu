
import { Router } from "express";
import {
  getCategories,
  translateQuestionForDisplay,
  translateQuestion,
} from "../controllers/question.controller";

const router = Router();

console.log("Qustion Route::::::::");
router.post("/translate", translateQuestion);
router.post("/display-translation", translateQuestionForDisplay);
router.post("/", getCategories);

export default router;

import { Router } from "express";
import { getCategories,getBeliefList} from "../controllers/category.controller";

const router = Router();
router.get("/", getCategories);
router.get("/belieflist", getBeliefList);

export default router;
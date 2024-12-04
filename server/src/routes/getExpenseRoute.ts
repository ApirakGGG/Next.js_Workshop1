import { Router } from "express";
import { getExpense } from "../controllers/getExpenseController";

const router = Router();

router.get("/", getExpense)

export default router
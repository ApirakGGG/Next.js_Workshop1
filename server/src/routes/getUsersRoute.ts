import { Router } from "express";
import { getUsers } from "../controllers/getUsersController";

const router = Router();

// ดึงข้อมูลมาจากPrisma DB
router.get("/", getUsers);

export default router;

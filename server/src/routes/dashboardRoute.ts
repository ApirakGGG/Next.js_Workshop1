import { Router } from "express";
import { getdashBoard } from "../controllers/dashboardControler";

const router = Router();

// ดึงข้อมูลมาจากPrisma DB
router.get("/", getdashBoard); 

export default router;
import { Router } from "express";
import {getProducts , createProduct} from "../controllers/getProductsController"

const router = Router();

router.get("/", getProducts); // ดึงข้อมูลสินค้า
router.post("/", createProduct); // สร้างสินค้า

export default router;
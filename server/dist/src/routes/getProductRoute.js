"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getProductsController_1 = require("../controllers/getProductsController");
const router = (0, express_1.Router)();
router.get("/", getProductsController_1.getProducts); // ดึงข้อมูลสินค้า
router.post("/", getProductsController_1.createProduct); // สร้างสินค้า
exports.default = router;

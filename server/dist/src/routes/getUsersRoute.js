"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getUsersController_1 = require("../controllers/getUsersController");
const router = (0, express_1.Router)();
// ดึงข้อมูลมาจากPrisma DB
router.get("/", getUsersController_1.getUsers);
exports.default = router;

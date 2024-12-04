"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getExpenseController_1 = require("../controllers/getExpenseController");
const router = (0, express_1.Router)();
router.get("/", getExpenseController_1.getExpense);
exports.default = router;

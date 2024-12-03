"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getdashBoard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // เชื่อมต่อPrisma
//สร้างฟังก์ชัน getdashBoard แบบ asynchronous สำหรับ API
const getdashBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // poppularProduct ดึงข้อมูลสินค้าที่ได้รับความนิยม (Popular Products) จากตาราง products
        const poppularProduct = yield prisma.products.findMany({
            take: 15, //take: 15: จำกัดผลลัพธ์ที่ดึงมาได้สูงสุด 15 รายการ
            orderBy: {
                //เรียงลำดับตามจำนวนสต็อก
                stockQuantity: "desc", //จากมากไปน้อย
            },
        });
        // salesSummary ดึงข้อมูลสรุปยอดขาย (Sales Summary) จากตาราง salesSummary
        const salesSummary = yield prisma.salesSummary.findMany({
            take: 5, //take: 5: จำกัดผลลัพธ์ที่ดึงมาได้สูงสุด 5 รายการ
            orderBy: {
                date: "desc", //เรียงลำดับตามวันที่ (date) จากใหม่ไปเก่า
            },
        });
        // PurchaseSummary ดึงข้อมูลสรุปค่าใช้จ่าย (Expense Summary) จากตาราง expenseSummary
        const purchaseSummary = yield prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        // ExpenseSummary ดึงข้อมูลค่าใช้จ่ายแยกตามหมวดหมู่ (Expense By Category) จากตาราง
        const expenseSummary = yield prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        // ExpenseByCategory ดึงข้อมูลค่าใช้จ่ายแยกตามหมวดหมู่ (Expense By Category) จากตาราง expenseByCategory
        const expenseByCategorySummaryRaw = yield prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        //แปลงข้อมูลใน expenseByCategorySummaryRaw ให้เหมาะสมกับการใช้งาน:
        const expenseByCategory = expenseByCategorySummaryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() })));
        //แปลงให้เป็นข้อมูลแบบ Json เพื่อใช้สำหรับฝั่ง Client
        res.json({
            poppularProduct,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategory,
        });
    }
    catch (err) {
        res.status(500).json({ message: " err:message" }); // error message check
    }
});
exports.getdashBoard = getdashBoard;

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // เชื่อมต่อPrisma

//สร้างฟังก์ชัน getdashBoard แบบ asynchronous สำหรับ API
export const getdashBoard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // poppularProduct ดึงข้อมูลสินค้าที่ได้รับความนิยม (Popular Products) จากตาราง products
    const poppularProduct = await prisma.products.findMany({
      take: 15, //take: 15: จำกัดผลลัพธ์ที่ดึงมาได้สูงสุด 15 รายการ
      orderBy: {
        //เรียงลำดับตามจำนวนสต็อก
        stockQuantity: "desc", //จากมากไปน้อย
      },
    });
    // salesSummary ดึงข้อมูลสรุปยอดขาย (Sales Summary) จากตาราง salesSummary
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5, //take: 5: จำกัดผลลัพธ์ที่ดึงมาได้สูงสุด 5 รายการ
      orderBy: {
        date: "desc", //เรียงลำดับตามวันที่ (date) จากใหม่ไปเก่า
      },
    });
    // PurchaseSummary ดึงข้อมูลสรุปค่าใช้จ่าย (Expense Summary) จากตาราง expenseSummary
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    // ExpenseSummary ดึงข้อมูลค่าใช้จ่ายแยกตามหมวดหมู่ (Expense By Category) จากตาราง
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    // ExpenseByCategory ดึงข้อมูลค่าใช้จ่ายแยกตามหมวดหมู่ (Expense By Category) จากตาราง expenseByCategory
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );
    //แปลงข้อมูลใน expenseByCategorySummaryRaw ให้เหมาะสมกับการใช้งาน:
    const expenseByCategory = expenseByCategorySummaryRaw.map((item) => ({
      //ใช้ map เพื่อวนลูปและปรับรูปแบบข้อมูลในแต่ละรายการ
      ...item,
      amount: item.amount.toString(), // แปลงฟิลด์ amount (ที่เป็น BigInt) ให้เป็น string เพราะ JSON ไม่รองรับ BigInt โดยตรง
    }));

    //แปลงให้เป็นข้อมูลแบบ Json เพื่อใช้สำหรับฝั่ง Client
    res.json({
      poppularProduct,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategory,
    });
  } catch (err) {
    res.status(500).json({ message: " err:message" }); // error message check
  }
};

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseSumRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });

    const expenseCategorySum = expenseSumRaw.map((item) => ({
      ...item, // แยกข้แมูลจาก map
      amount: item.amount.toString(), //แปลง amount เป็น string
    }));
    res.json(expenseCategorySum); //แปลงข้อมูลเป็นjson
  } catch (e) {
    res.status(500).json({ message: "Error getting expense" });
  }
};

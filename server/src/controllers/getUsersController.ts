import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // เชื่อมต่อ Prisma
//function getUser
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).send({ message: "error to fetch data" });
  }
};

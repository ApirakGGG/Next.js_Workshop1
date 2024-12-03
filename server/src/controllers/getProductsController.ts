import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString(); // อ่าน query string ชื่อ search จาก request และแปลงเป็น string หากมีการส่งค่ามา
    const products = await prisma.products.findMany({
      //เพื่อดึงข้อมูลสินค้าจาก table products โดยใส่เงื่อนไขการค้นหา
      where: {
        name: {
          //ตั้งเงื่อนไขให้ค้นหาสินค้าที่ name มีคำที่ตรงกับค่าในตัวแปร search
          contains: search,
        },
      },
    });
    res.json(products); //ส่งข้อมูลสินค้าที่ค้นหาได้ในรูปแบบ JSON กลับไปให้ client
  } catch (err) {
    res.status(500).json({ massage: "error", status: err });
  }
};

//เพิ่มสินค้าใหม่ในฐานข้อมูล
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //อ่านข้อมูลสินค้าใหม่จาก req.body ที่ client ส่งมา เช่น
    const { productId, name, price, rating, stockQuantity } = req.body;
    // / create เพื่อเพิ่มสินค้าลงในฐานข้อมูล โดยกำหนดค่าในฟิลด์ต่าง ๆ
    const product = await prisma.products.create({ 
      // ระบุค่าที่จะบันทึกลงใน table products
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    //ส่ง HTTP Status Code 201 (Created) พร้อมข้อมูลสินค้าที่เพิ่มใหม่กลับไปให้ client
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ massage: "error", status: err });
  }
};

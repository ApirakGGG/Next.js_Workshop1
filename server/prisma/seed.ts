//prisma client
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// สร้างอินสแตนซ์เพื่อจัดการคำสั่งต่าง ๆ กับฐานข้อมูล
const prisma = new PrismaClient();

// ลบข้อมูลทั้งหมดในฐานข้อมูล
async function deleteAllData(orderedFilesNames: string[]) {
  //การสร้าง modelNames จาก orderedFilesNames
  const modelNames = orderedFilesNames.map((fileName) => {
    //ใช้ Path.basename เพื่อตัดนามสกุลไฟล์ (.js, .ts) ออกจากชื่อไฟล์
    const modelName = path.basename(fileName, path.extname(fileName));
    //แปลงอักษรตัวแรกเป็นตัวพิมพ์ใหญ่
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  }); //result = สร้าง Array ของชื่อโมเดล เช่น: ["User", "Post", "Comment"]

  //ใช้ for...of เพื่อวนลูปชื่อโมเดลแต่ละตัวใน modelNames
  for (const modelName of modelNames) {
    //ใช้ชื่อโมเดล (modelName) เพื่อเข้าถึงโมเดลใน Prisma Client
    const model: any = prisma[modelName as keyof typeof prisma]; //ช่วยบอก TypeScript ว่า modelName คือ key ของ Prisma Client
    // ตรวจสอบว่าโมเดลมีอยู่ใน Prisma Client หรือไม่
    if (model) {
      await model.deleteMany({}); //ใช้ Prisma Client เพื่อ ลบข้อมูลทั้งหมด ในโมเดลปัจจุบัน
      console.log(`Clear data from ${modelName}`);
    } else {
      //ถ้าโมเดลไม่มีอยู่ใน Prisma Client
      console.error(
        `${modelName} not found. Please ensure the model is correctly sprecified`
      );
    }
  }
}

async function main() {
  //กำหนด path ไปยังโฟลเดอร์ที่เก็บไฟล์ข้อมูล 
  //__dirname: ชี้ไปยังตำแหน่งไดเรกทอรีของไฟล์ที่กำลังทำงานอยู่
  const dataDirectory = path.join(__dirname, "seedData"); // สร้าง path ไปยังโฟลเดอร์ seedData

  //กำหนดลำดับไฟล์ JSON ที่จะใช้สำหรับ seed ข้อมูล
  const orderedFilesNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  //เรียกใช้ฟังก์ชัน deleteAllData ที่รับ orderedFilesNames เป็นพารามิเตอร์
  await deleteAllData(orderedFilesNames);

  //ใช้ for...of เพื่อวนลูปแต่ละไฟล์ใน orderedFilesNames
  for (const fileName of orderedFilesNames) {
    const filePath = path.join(dataDirectory, fileName); //สร้าง path สำหรับไฟล์ JSON ปัจจุบัน
    //อ่านและพาร์สข้อมูล JSON //fs.readFileSync: อ่านไฟล์ JSON ที่กำหนด
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));//JSON.parse: แปลงข้อมูลจาก JSON เป็น object/array
    // แปลงชื่อไฟล์ JSON ให้เป็นชื่อโมเดล //path.basename: ตัดนามสกุลออกจากชื่อไฟล์ //path.extname: ดึงนามสกุลไฟล์ เช่น .json
    const modelName = path.basename(fileName, path.extname(fileName)); //ตัวอย่าง: products.json → products
    //ใช้ชื่อ modelName เพื่อเข้าถึงโมเดลใน Prisma Client
    const model: any = prisma[modelName as keyof typeof prisma]; //ถ้า modelName = "products" → prisma.products

    //ตรวจสอบว่าโมเดลมีอยู่หรือไม่
    if (!model) {
      console.error(`No prisma models matches the file name ${fileName}`); //แสดงข้อความข้อผิดพลาด
      continue; //ข้ามไปยังไฟล์ถัดไป (continue)
    }

    //for...of jsonData: วนลูปข้อมูลแต่ละรายการในไฟล์ JSON
    for (const data of jsonData) {
      await model.create({
        data,
      }); //เพิ่มข้อมูล data ลงในฐานข้อมูล
    }
    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect(); // ปิดการเชื่อต่อฐานข้อมูล
  });

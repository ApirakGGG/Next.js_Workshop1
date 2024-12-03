import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// Route imports
import dashboardRoute from "./routes/dashboardRoute"
import getUsersRoute from "./routes/getUsersRoute"
import getProducts from "./routes/getProductRoute"

// Configuration
dotenv.config();
const app = express(); //จัดการ HTTP requests และกำหนด routing
app.use(express.json()); //แปลง JSON payload จาก HTTP request body ให้เป็น JavaScript object
app.use(helmet()); // Helmet.js เพื่อเพิ่ม HTTP header สำหรับความปลอดภัย
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //กำหนด Cross-Origin Resource Sharing (CORS) ให้อนุญาตการเข้าถึง
app.use(morgan("common")); //ใช้ Morgan เป็น middleware สำหรับการ log HTTP requests
app.use(bodyParser.json()); //แปลง JSON payload ใน request body ให้เป็น JavaScript object
app.use(bodyParser.urlencoded({ extended: false })); //Middleware เพื่อจัดการ application/x-www-form-urlencoded payload (
//extended: false หมายความว่า: ไม่อนุญาตให้ใช้ข้อมูลที่มีโครงสร้างซับซ้อน (เช่น nested objects)

app.use(cors()); //เพื่ออนุญาตให้ client-side application จากโดเมนอื่นสามารถเข้าถึงเซิร์ฟเวอร์นี้ได้


// Router 
// Dashboard route กำหนด route handler:  ฟังก์ชันที่จะจัดการคำขอนั้น
//ส่งคำขอนี้มายัง router.get("/", getdashBoard).
app.use("/dashboard", dashboardRoute ); // http://localhost:8000/dashboard
app.use("/users", getUsersRoute ); // http://localhost:8000/Users
app.use("/products", getProducts); // http://localhost:8000/Products
//Server
const port = process.env.PORT || 3001; //รันบน Port 8000 || 3001
app.listen(port, () => {
  console.log(`Server runing on ${port}`);
});

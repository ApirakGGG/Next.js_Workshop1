"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// Route imports
const dashboardRoute_1 = __importDefault(require("./routes/dashboardRoute"));
const getUsersRoute_1 = __importDefault(require("./routes/getUsersRoute"));
const getProductRoute_1 = __importDefault(require("./routes/getProductRoute"));
// Configuration
dotenv_1.default.config();
const app = (0, express_1.default)(); //จัดการ HTTP requests และกำหนด routing
app.use(express_1.default.json()); //แปลง JSON payload จาก HTTP request body ให้เป็น JavaScript object
app.use((0, helmet_1.default)()); // Helmet.js เพื่อเพิ่ม HTTP header สำหรับความปลอดภัย
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" })); //กำหนด Cross-Origin Resource Sharing (CORS) ให้อนุญาตการเข้าถึง
app.use((0, morgan_1.default)("common")); //ใช้ Morgan เป็น middleware สำหรับการ log HTTP requests
app.use(body_parser_1.default.json()); //แปลง JSON payload ใน request body ให้เป็น JavaScript object
app.use(body_parser_1.default.urlencoded({ extended: false })); //Middleware เพื่อจัดการ application/x-www-form-urlencoded payload (
//extended: false หมายความว่า: ไม่อนุญาตให้ใช้ข้อมูลที่มีโครงสร้างซับซ้อน (เช่น nested objects)
app.use((0, cors_1.default)()); //เพื่ออนุญาตให้ client-side application จากโดเมนอื่นสามารถเข้าถึงเซิร์ฟเวอร์นี้ได้
// Router 
// Dashboard route กำหนด route handler:  ฟังก์ชันที่จะจัดการคำขอนั้น
//ส่งคำขอนี้มายัง router.get("/", getdashBoard).
app.use("/dashboard", dashboardRoute_1.default); // http://localhost:8000/dashboard
app.use("/users", getUsersRoute_1.default); // http://localhost:8000/Users
app.use("/products", getProductRoute_1.default); // http://localhost:8000/Products
//Server
const port = process.env.PORT || 3001; //รันบน Port 8000 || 3001
app.listen(port, () => {
    console.log(`Server runing on ${port}`);
});

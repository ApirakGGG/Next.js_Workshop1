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
exports.createProduct = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString(); // อ่าน query string ชื่อ search จาก request และแปลงเป็น string หากมีการส่งค่ามา
        const products = yield prisma.products.findMany({
            //เพื่อดึงข้อมูลสินค้าจาก table products โดยใส่เงื่อนไขการค้นหา
            where: {
                name: {
                    //ตั้งเงื่อนไขให้ค้นหาสินค้าที่ name มีคำที่ตรงกับค่าในตัวแปร search
                    contains: search,
                },
            },
        });
        res.json(products); //ส่งข้อมูลสินค้าที่ค้นหาได้ในรูปแบบ JSON กลับไปให้ client
    }
    catch (err) {
        res.status(500).json({ massage: "error", status: err });
    }
});
exports.getProducts = getProducts;
//เพิ่มสินค้าใหม่ในฐานข้อมูล
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //อ่านข้อมูลสินค้าใหม่จาก req.body ที่ client ส่งมา เช่น
        const { productId, name, price, rating, stockQuantity } = req.body;
        // / create เพื่อเพิ่มสินค้าลงในฐานข้อมูล โดยกำหนดค่าในฟิลด์ต่าง ๆ
        const product = yield prisma.products.create({
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
    }
    catch (err) {
        res.status(500).json({ massage: "error", status: err });
    }
});
exports.createProduct = createProduct;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Product types
export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

//SalesSummary types
export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

//PurchaseSummary
export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

//ExpenseSummary types
export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

//ExpenseByCategory types
export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

//New Product
export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

//User
export interface User {
  userId: string;
  name: string;
  email: string;
}

//All types //ชื่อต้องตรงกับDB
export interface DashBoard {
  poppularProduct: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategory: ExpenseByCategorySummary[];
}

// สร้าง API slice ชื่อ api ซึ่งจะช่วยจัดการการร้องขอข้อมูล (API requests)
//  ในแอปพลิเคชัน Redux โดยใช้หลักการ declarative แบบ "query" และ "mutation"
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashBoard", "Products", "Users"],
  endpoints: (build) => ({
    //ชื่อ query สำหรับเรียกใช้ใน Components
    getdashBoard: build.query<DashBoard, void>({
      query: () => "/dashboard", //query ไปยังendpoint ของApi
      providesTags: ["DashBoard"], //query นี้เกี่ยวข้องกับ DashboardTags
    }),
    //ชื่อ query สำหรับเรียกใช้ใน Components
    getProduct: build.query<Product[], string | void>({
      query: (search) => ({
        //parameters กำหนดค่าsearch
        url: "/products", //query ไปยังendpoint ของApi
        params: search ? { search } : {}, //ถ้าsearch มีค่า จะส่งค่า { search: search } เป็น query string
      }),
      providesTags: ["Products"], //query นี้เกี่ยวข้องกับ ProductsTags
    }),
    //ชื่อ query สำหรับเรียกใช้ใน Components
    createProduct: build.mutation<Product, NewProduct>({
      //Product: ชนิดข้อมูลที่ mutation จะคืนกลับ
      //NewProduct: ชนิดข้อมูลที่ mutation จะส่งไป (input data)
      query: (NewProduct) => ({
        url: "/products", //ชี้ไปยัง endpoint ของ API เช่น POST /products
        method: "POST", //ระบุว่าใช้ HTTP POST เพื่อส่งข้อมูล
        body: NewProduct, //ส่งข้อมูลสินค้า (NewProduct) เป็น payload ใน request body
      }),
      //ระบุ tag "Products" ที่ mutation นี้จะ invalid เมื่อมีการเรียกใช้งาน
      //เมื่อ tag "Products" ถูก invalidated Queries ที่เกี่ยวข้องกับ "Products" (เช่น getProduct) จะดึงข้อมูลใหม่โดยอัตโนมัติ
      //ใช้เพื่ออัปเดตข้อมูลสินค้าในระบบหลังการสร้างสินค้าใหม่
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users", //endpoint Api User
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetdashBoardQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useGetUsersQuery,
} = api; 
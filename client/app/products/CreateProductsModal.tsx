import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "../(Components)/Header/Header";
import { v4 } from "uuid"; // v4() เป็นฟังก์ชันจาก uuid สำหรับสร้าง productId แบบสุ่ม

//interfaces types

type ProductFromData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductsModalProps = {
  isOpen: boolean; // ระบุว่า Modal เปิดอยู่หรือไม่
  onClose: () => void; // ฟังก์ชันปิด Modal
  // ฟังก์ชันที่เรียกใช้เมื่อกดสร้างสินค้าใหม่ พร้อมส่งข้อมูลสินค้า (fromData)
  onCreate: (fromData: ProductFromData) => void;
};

const CreateProductsModal = ({
  onCreate,
  onClose,
  isOpen,
}: CreateProductsModalProps) => {
  const [fromData, setFromData] = useState({
    productId: v4(), // สร้าง UUID สำหรับ productId
    name: "", // ชื่อสินค้า
    price: 0, // ราคาสินค้า (เริ่มต้นที่ 0)
    stockQuantity: 0, // จำนวนสินค้าในคลัง (เริ่มต้นที่ 0)
    rating: 0, // คะแนนเรตติ้งสินค้า (เริ่มต้นที่ 0)
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // ดึงชื่อ (`name`) และค่าที่กรอก (`value`) จาก input
    setFromData({
      ...fromData, // คัดลอกข้อมูลเดิม
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value) // แปลงเป็นตัวเลขถ้าเป็นฟิลด์ตัวเลข
          : value, // ถ้าไม่ใช่ ให้เก็บเป็น string
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //กันหน้าเว็บ Refresh เมื่อกด Sumit
    onCreate(fromData); // ส่งข้อมูลสินค้าไปที่ฟังก์ชัน `onCreate`
    onClose(); // ปิด Modal หลังจากสร้างสินค้า
  };

  //ถ้าไม่กดisOpen ให้ return null
  //ถ้ากด isopen return Modal Components
  if (!isOpen) {
    return null; // ถ้า `isOpen` เป็น false → ไม่แสดงอะไรเลย (return null)
  }

  const labelstyle = "block text-sm font-medium text-slate-700";
  const inputstyle = "block w-full border-gray-500 border-2 rounded-md";
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* // product Name */}
          <label htmlFor="productName" className={labelstyle}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={fromData.name}
            placeholder="Name"
            className={inputstyle}
            required
          />

          {/* // product Price */}
          <label htmlFor="productPrice" className={labelstyle}>
            Product Price
          </label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={fromData.price}
            placeholder="Price"
            className={inputstyle}
            required
          />

          {/* //  Stock Quantity */}
          <label htmlFor="stockQuantity" className={labelstyle}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            onChange={handleChange}
            value={fromData.stockQuantity}
            placeholder="Stock_Quantity"
            className={inputstyle}
            required
          />

          {/* // product Rating */}
          <label htmlFor="rating" className={labelstyle}>
            Product Rating
          </label>
          <input
            type="number"
            name="rating"
            onChange={handleChange}
            value={fromData.rating}
            placeholder="Rating"
            className={inputstyle}
            required
          />

          {/* Create Action */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          {/* Cancle Button */}
          <button
            type="button"
            onClick={onClose}
            className="m-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded"
          >
            Cancle
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductsModal;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Image from "next/image";
import { useGetdashBoardQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import Rating from "../(Components)/Rating/Rating";

const CardPopPularProduct = () => {
  // เรียกใช้ข้อมูลจาก APIs
  const { data: dashBorardQuery, isLoading } = useGetdashBoardQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-md pb-16 overflow-hidden">
      {isLoading ? (
        // Loading เมื่อ Refresh
        <div className="m-5 flex justify-center items-center py-96 ">
          <Image
            className="bg-transparent"
            src={"/Asset/Loading.gif"}
            alt="Loading"
            width={70}
            height={50}
          />
        </div>
      ) : (
        <>
          <h3 className="flex justify-center items-center py-5">
            Poppular Product
          </h3>
          <div className="flex justify-between items-center px-8 spac-x-4">
            <p>Product</p>
            <p>Infomation</p>
            <p>sold</p>
          </div>
          {/* ซ่อน Scrollbar แต่ยังเลื่อน (scroll) ได้ #scrollbar-container*/}
          <div className="scrollbar-container overflow-auto h-full">
            {/* Loop Data จาก DB */}
            {dashBorardQuery?.poppularProduct.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                {/* Product Image */}
                <Image
                  src="/Loading.gif"
                  alt="Product"
                  width={30}
                  height={30}
                />
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-between gap-1">
                    {/* Product Name */}
                    <p>{product.name}</p>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        {/* Product Price */}${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      {/* Product Rating  */}
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="flex text-xs items-center">
                  <button className="p-2 text-blue-200 mr-2">
                    <ShoppingBag className="w-6 h-6" />
                  </button>
                  <p>{Math.round(product.stockQuantity / 1000)} K sild</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopPularProduct;

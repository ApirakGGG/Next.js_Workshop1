"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "lucide-react";
import Header from "../(Components)/Header/Header";
import Rating from "../(Components)/Rating/Rating";
import CreateProductsModal from "./CreateProductsModal";
import { useCreateProductMutation, useGetProductQuery } from "@/state/api";

//interface data types

type ProductFromData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false); // setเปิด/ปิด Modal

  const { data: products, isLoading, isError } = useGetProductQuery(search); //ดึงข้อมูลสินค้า

  const [createProduct] = useCreateProductMutation(); //สร้างสินค้า
  const handelCreateProduct = async (productData: ProductFromData) => {
    // function createProduct
    await createProduct(productData);
  };

  // loading logo
  if (isLoading) {
    return (
      <div className="flex justify-center divy-96">
        <Image
          src={"/Asset/Loading.gif"}
          alt="Loading"
          width={70}
          height={50}
        />
      </div>
    );
  }

  // error checking
  if (isError || !products) {
    return <p className="text-center text-red-500">Error to fetching </p>;
  }
  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="m-2 h-5 w-5 text-gray-200" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // กันเว็บrefresh เมื่อกด Search
            placeholder="Search Products"
          />
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex justify-between mb-6 items-center">
        <Header name="Products" />
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-slate-500 
        font-bold py-2 px-4 rounded-md mr-5"
        >
          <PlusCircleIcon className="mr-2  !text-gray-20" />
          Create Product
        </button>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between mr-5">
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
          products.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4  max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image src="" alt="Product Name" width={150} height={150} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <div>{product.stockQuantity}</div>
                {/* Product Rating */}
                {product.rating && (
                  <div className="flex items-center mt-2">
                  <Rating rating={product.rating} />
                </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {/* Add New Product */}
      <CreateProductsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handelCreateProduct}
      />
    </div>
  );
};

export default Products;

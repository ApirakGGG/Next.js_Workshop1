"use client ";
import React from "react";
import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "lucide-react";
import Header from "../(Components)/Header/Header";
import Rating from "../(Components)/Rating/Rating";

const Products = () => {
  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="m-2 h-5 w-5 text-gray-200" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search Products"
          />
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex justify-between mb-6 items-center">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-slate-500 
        font-bold py-2 px-4 rounded-md mr-5"
        >
          <PlusCircleIcon className="mr-2  !text-gray-20" />
          Create Product
        </button>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between mr-5">
        {/* Map Products */}
        <div className="border shadow rounded-md p-4  max-w-full w-full mx-auto">
          <div className="flex flex-col items-center">
            <Image src="" alt="Product Name" width={150} height={150} />
            <h3>Product Name</h3>
            <p>Product Price</p>
            <div>Stock Quantity</div>
            {/* Product Rating */}
            <div className="flex items-center mt-2">
              <Rating rating={5} />
            </div>
          </div>
        </div>

        {/* Map Products */}
        <div className="border shadow rounded-md p-4  max-w-full w-full mx-auto">
          <div className="flex flex-col items-center">
            <Image src="" alt="Product Name" width={150} height={150} />
            <h3>Product Name</h3>
            <p>Product Price</p>
            <div>Stock Quantity</div>
            {/* Product Rating */}
            <div className="flex items-center mt-2">
              <Rating rating={5} />
            </div>
          </div>
        </div>

        {/* Map Products */}
        <div className="border shadow rounded-md p-4  max-w-full w-full mx-auto">
          <div className="flex flex-col items-center">
            <Image src="" alt="Product Name" width={150} height={150} />
            <h3>Product Name</h3>
            <p>Product Price</p>
            <div>Stock Quantity</div>
            {/* Product Rating */}
            <div className="flex items-center mt-2">
              <Rating rating={5} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* Add New Product */}
    </div>
  );
};

export default Products;

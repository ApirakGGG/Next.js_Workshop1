"use client";
import React from "react";
import { useGetProductQuery } from "@/state/api";
import Header from "../(Components)/Header/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

//columns กำหนดfield ต่างๆ
const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 180 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const paginationModel = { paper: 0, pageSize: 9 };

const Inventorry = () => {
  const { data: product, isError, isLoading } = useGetProductQuery();
  // console.log("Product:", product);

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  // ถ้าไม่มีข้อมูล error และไม่เจอ product
  if (isError || !product) {
    return (
      <p className="py-6 text-center text-red-500">Error Failed to fetching</p>
    );
  }

  return (
    <div className="flex flex-col ">
      <Header name="INVENTORY" />
      <Paper
        className="mt-5  items-center rounded-lg"
        sx={{ height: 600, width: "98%"}}
      >
        <DataGrid
          rows={product}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          getRowId={(row) => row.productId}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0  ,color: "black"}}
        />
      </Paper>
    </div>
  );
};

export default Inventorry;

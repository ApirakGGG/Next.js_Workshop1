"use client";
import { useGetUsersQuery } from "@/state/api";
import React from "react";
import Image from "next/image";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../(Components)/Header/Header";
import { Paper } from "@mui/material";

const Users = () => {
  const { data: users, isLoading , isError } = useGetUsersQuery();

  const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  const paginationModel = { paper: 0, pageSize: 15 };

  if (isError || !users) {
    return (
      <p className="text-red-500 flex justify-center items-center">
        Failed to fetching User
      </p>
    );
  }
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-96">
          <Image
            src={"/Asset/Loading.gif"}
            alt="Loading"
            width={70}
            height={50}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <Header name="User" />
          <Paper sx={{ height: 900, width: "98%" }} className="mt-5 rounded-md">
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.userId}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0  ,color: "black"}}
              checkboxSelection
            />
          </Paper>
        </div>
      )}
    </div>
  );
};

export default Users;

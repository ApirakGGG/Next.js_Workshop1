/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useGetdashBoardQuery } from "@/state/api";
import React, { useState } from "react";
import Image from "next/image";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { TrendingUp } from "lucide-react";

function CardSalesSummary() {
  const { data, isLoading, isError } = useGetdashBoardQuery(); //ดึงข้อมูลจากApi
  const SalesSummary = data?.salesSummary || []; //ตรวจสอบว่า SalesSummary มีข้อมูลมั้ยถ้าไม่มีคือ []
  // const [timeframe, setTimeFream] = useState("Daily"); //สร้าง State สำหรับเก็บช่วงเวลาที่เลือก (ค่าเริ่มต้นคือ "weekly").
  console.log("Data", SalesSummary);

  const totalSumValue = //คำณวนผลรวมของยอดขาย
    SalesSummary.reduce(
      (
        acc,
        curr //ใช้ reduce: วนลูปข้อมูลใน SalesSummary.
      ) =>
        //นำค่า totalValue ของแต่ละรายการมาบวกสะสม.
        acc + curr.totalValue,
      0
    ) || 0; ////ค่าเริ่มต้น: 0 (กรณี SalesSummary ว่างเปล่า).

  const averagepercentage = //คำณวน percentage การเปลี่ยนแปลง
    SalesSummary.reduce((acc, curr, __, array) => {
      //ลูปข้อมูลใน SalesSummary
      return acc + curr.changePercentage! / array.length; //แบ่ง % ด้วย Array.length
    }, 0) || 0; //ถ้าผลลัพธ์เป็น undefined หรือ NaN → ใช้ 0.

  const highesValueData =
    SalesSummary.reduce((acc, curr) => {
      //ใช้reduce เปรียบเทียบค่า totalValue Curr || acc
      return acc.totalValue > curr.totalValue ? acc : curr; //เก็บรายการที่มีมูลค่าสูงสุดใน highesValueData
    }, SalesSummary[0]) || {}; //ค่าเริ่มต้น: SalesSummary[0] (รายการแรกในข้อมูล). ว่างเปล่า[]

  const highesValueDate = highesValueData.date //format "MM/DD/YY" โดยใช้ toLocaleDateString.
    ? new Date(highesValueData.date).toLocaleDateString("en-Us", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A"; //ถ้าไม่มีค่าให้แสดงN/A

  //Error Handling
  if (isError) {
    return <p className="m-5">Failed cannot fetch Data.</p>;
  }
  return (
    <div className="bg-white row-span-3 xl:row-span-6 shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="flex items-center justify-center m-5 py-28">
          <Image
            src={"/Asset/Loading.gif"}
            alt="Loading"
            width={70}
            height={50}
          />
        </div>
      ) : (
        <>
          {/* top */}
          <div className="flex justify-center mt-5 items-center">
            <h3>SalesSummary</h3>
          </div>

          {/* body */}
          <div>
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-slate-400">Value</p>
                <span className="font-extrabold text-2xl">
                  $
                  {(totalSumValue / 1000000).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-green-500 tetx-sm ml-2">
                  <TrendingUp className="mr-1 inline w-4 h-4" />
                  {averagepercentage.toFixed(2)}%
                </span>
              </div>
              {/* Update graph */}
              {/* <select
                className="shadow-sm border-2 border-slate-300 bg-white rounded ml-3"
                value={timeframe}
                onChange={(e) => {
                  setTimeFream(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select> */}
            </div>
            {/* charts */}
            {/* Container ปรับขนาดกราฟ */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              {/* BarChart: แสดงข้อมูล */}
              <BarChart
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                data={SalesSummary}
              >
                {/* CartesianGrid: เพิ่มเส้นตารางแรวตั้ง || แนวนอน */}
                <CartesianGrid strokeDasharray="5 " stroke="" fillOpacity={1} fill="" />
                 {/* แกน X แสดงข้อมูลวันที่ */}
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1} / ${date.getDate()}`;
                    }}
                  />
                  {/* แกน Y แสดงข้อมูลหน่วย (จำนวนเงิน) */}
                  <YAxis
                    tickFormatter={(value) => {
                      return `$${(value / 1000000).toFixed(0)}m`;
                    }}
                    tick={{ fontSize: 12, dx: -1 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  {/*Tooltip : แสดงข้อมูลเมื่อชี้ที่กราฟ */}
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString("en")}`]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                      });
                    }}
                  />
                  {/*Bar : แสดงสีกราฟ */}
                  <Bar
                    dataKey="totalValue"
                    fill="#3182ce"
                    barSize={10}
                    radius={[10, 10, 0, 0]}
                  />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* footer */}
          <div>
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              {/* แสดงจำนวนรายการSales ทั้งหมด */}
              <p>{SalesSummary.length || 0}</p>
              {/* แสดงวันที่มียอดขายเยอะที่สุด */}
              <p className="text-sm">
                Highset Sales Date:{""}
                <span className="font-bold ">{highesValueDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CardSalesSummary;

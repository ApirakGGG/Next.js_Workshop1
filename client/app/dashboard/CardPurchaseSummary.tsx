import React from "react";
import { useGetdashBoardQuery } from "@/state/api";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CardPurchaseSummary() {
  const { data, isLoading } = useGetdashBoardQuery(); //ดึงข้อมูล Purchase Summary. //เก็บผลลัพธ์ที่ได้จาก API.
  const purschaseData = data?.purchaseSummary || []; // ตรวจสอบว่า purchaseSummary มีข้อมูลหรือไม่ (หากไม่มีให้ใช้ []).
  const lastdatePoint = purschaseData[purschaseData.length - 1] || null; //ดึงข้อมูลจุดสุดท้ายใน purchaseSummary เพื่อนำมาแสดงผล.

  return (
    <div className="flex flex-col justify-between bg-white row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 rounded-md shadow-2xl">
      {/* // Loading เมื่อ Refresh */}
      {isLoading ? (
        <div className="flex items-center justify-center m-5 py-28">
          <Image src={"/Asset/Loading.gif"} alt="Loading" width={70} height={50} />
        </div>
      ) : (
        <>
          {/* Top */}
          <h3 className="flex justify-center mt-5 items-center">
            PurchaseSummary
          </h3>

          {/* Body */}
          <div className="mb-4 mt-7 px-7">
            <p className="text-xs text-gray-500">purchase</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">
                {/*ใช้ numeral เพื่อจัดรูปแบบตัวเลข totalPurchased*/}
                {lastdatePoint
                  ? numeral(lastdatePoint.totalPurchased).format("$0.00a")
                  : "0"}
              </p>
            </div>
            {lastdatePoint && (
              <p
                className={`text-sm ${
                  lastdatePoint.changePercentage! >= 0
                    ? "text-green-500" //สีเขียว (เพิ่มขึ้น) → TrendingUp.
                    : "text-red-500" //สีแดง (ลดลง) → TrendingDown.
                } flex ml-3`}
              >
                {lastdatePoint.changePercentage! >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {/*//ใช้ Math.abs() เพื่อให้ค่าคงเป็นบวกเสมอ.*/}
                {Math.abs(lastdatePoint.changePercentage!)}%
              </p>
            )}
            <div>
              {/* Charts lib: recharts */}
              <ResponsiveContainer width={600} height={350} className={`px-7`}>
                {/*ResponsiveContainer ทำให้กราฟปรับขนาดได้ตาม container.*/}
                <AreaChart
                  data={purschaseData}
                  margin={{ top: 5, right: 0, left: -50, bottom:150}}
                >
                  {/*AreaChart ใช้ข้อมูล purschaseData เพื่อสร้างกราฟ.*/}
                  <XAxis dataKey="date" tick={false} axisLine={false} />
                  <YAxis tickLine={false} tick={false} axisLine={false} />
                  {/*XAxis และ YAxis: ซ่อน tick และ axisLine เพื่อให้กราฟดูสะอาด.*/}
                  <Tooltip
                    formatter={(value: number) => [
                      `$ ${value.toLocaleString("en")}`,
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-Us", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                  />
                  {/*Tooltip: แสดงค่า totalPurchased ในรูปแบบ $ และจัดรูปแบบวันที่ให้อ่านง่าย.*/}
                  <Area
                    type="linear"
                    dataKey="totalPurchased"
                    stroke="#8884d8"
                    fill="#8884d8"
                    dot={true}
                  />
                  {/* Area: แสดงพื้นที่กราฟด้วยสี #8884d8. */}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CardPurchaseSummary;

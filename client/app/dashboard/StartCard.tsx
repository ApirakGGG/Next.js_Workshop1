/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Image from "next/image";
import { useGetdashBoardQuery } from "@/state/api";
import { LucideIcon } from "lucide-react";

type StatDeatial = {
  title: string;
  amount: string;
  changePercenTage: number;
  IconComponents: LucideIcon;
};

type StartCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDeatial[]; // เป็น Array
  dateRange: string;
};

const StartCard = ({
  title,
  primaryIcon,
  details = [],
  dateRange,
}: StartCardProps) => {
  // Format % ให้เป็น string
  const formatPercenTage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal} ${value.toFixed()}%`;
  };

  //เปลี่ยนสีถ้า value มากกว่า หรือ น้อยกว่า
  const getChangeColors = (value: number) =>
    value > 0 ? "text-green-500" : "text-red-500";
  
  const { isLoading } = useGetdashBoardQuery();
  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between">
      {/* Header */}
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
          {/* top */}
          <div className="flex justify-between items-center px-5 mb-2 pt-4">
            <h2 className="font-semibold text-lg text-slate-700">{title}</h2>
            <span className="text-sm text-slate-500">{dateRange}</span>
          </div>
          {/* body */}
          <div className="flex mb-6 items-center justify-around gap-4 px-5">
            <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
              {primaryIcon}
            </div>
            <div className="flex-1">
              {Array.isArray(details) && details.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center my-5 px-7 justify-between">
                    <span className="text-gray-300 items-center">{item.title}</span>
                    <span className="font-bold text-gray-600">
                      {item.amount}
                    </span>
                    <div className="flex items-center">
                      <item.IconComponents
                        className={`${getChangeColors(
                          item.changePercenTage
                        )} w-4 h-4 mr-1`}
                      />

                      <span
                        className={`${getChangeColors(
                          item.changePercenTage
                        )} font-medium`}
                      >
                        {formatPercenTage(item.changePercenTage)}
                      </span>
                    </div>
                  </div>
                  {/* ถ้าใช้ .length ไม่ได้ เปลี่ยนชื่อตัวแปร เพราะตัวแปรอาจซ้อนกัน ที่รับมาจาด Props */}
                  {index < details.length - 1 && <hr />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StartCard;

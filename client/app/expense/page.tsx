"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/app/(Components)/Header/Header";
import {
  ExpenseByCategorySummary,
  useGetExpenseByCategoryQuery,
} from "@/state/api";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// type interface"
type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expense = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectCategory, setSelectCategory] = useState("All"); // select category เก็บเป็นstring "All"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // API Data
  const {
    data: expenseData,
    isLoading,
    isError,
  } = useGetExpenseByCategoryQuery();

  const expense = useMemo(() => expenseData ?? [], [expenseData]);
  //ถ้า expenseData มีค่า null หรือ undefined, จะคืนค่าเป็น [] (อาร์เรย์ว่าง)
  //ถ้า expenseData มีค่าที่ไม่ใช่ null หรือ undefined, จะคืนค่า expenseData

  //แปลงDate เป็น string
  const parseDate = (dateString: string) => {
    const date = new Date(dateString); // สร้าง object Date จาก input string
    // แปลง Date เป็น ISO string และแยกเอาเฉพาะส่วนวันที่
    return date.toISOString().split("T")[0];
    //ใช้ .split("T") เพื่อแบ่งข้อความออกเป็น 2 ส่วนด้วยตัวอักษร T
    //ส่วนแรก: วันที่ เช่น "2024-12-03"
    //ส่วนที่สอง: เวลา เช่น "00:00:00.000Z"
    //ใช้ [0] เพื่อดึงเฉพาะส่วนแรก (วันที่)
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expense
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectCategory === "All" || data.category === selectCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});
    return Object.values(filtered);
  }, [expense, selectCategory, startDate, endDate]);

  //tailwind object
  const Classname = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-96">
        <Image
          className="bg-transparent"
          src={"/Asset/Loading.gif"}
          alt="Loading"
          width={70}
          height={50}
        />
      </div>
    );
  }

  if (isError || !expenseData) {
    return (
      <div>
        <p className="text-red-500 text-2xl flex justify-center items-center">
          Error to fetching ExpenseData.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <Header name="Expense" />
        <p className="text-sm text-gray-500">
          A visual representation of expense over time.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white p-6 shadow rounded-lg">
          <h3 className="mb-4 text-lg font-semibold">
            Filter by Category and Date
          </h3>
          <div>
            {/* Category */}
            <div className="space-y-4">
              <label htmlFor="category" className={Classname.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={Classname.selectInput}
              >
                <option>All</option>
                <option>Ofifice</option>
                <option>Profresssional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* Start Date */}
            <div className="mt-3">
              <label htmlFor="start-date" className={Classname.label}>
                Start-Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={Classname.selectInput}
              />
            </div>
            {/* End-Date */}
            <div className="mt-3">
              <label htmlFor="end-date" className={Classname.label}>
                End-Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={Classname.selectInput}
              />
            </div>
          </div>
        </div>
        {/* Pie Charts */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width={"100%"} height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx={"50%"}
                cy={"50%"}
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey={"amount"}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29,78,216)" : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expense;

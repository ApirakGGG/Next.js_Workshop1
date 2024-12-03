import React from "react";
import Image from "next/image";
import { useGetdashBoardQuery, ExpenseByCategorySummary } from "@/state/api";
import { Cell, Pie, ResponsiveContainer, PieChart } from "recharts";
import { TrendingUp } from "lucide-react";

type ExpenseSums = {
  [category: string]: number;
};

const colors = ["#00C49F", "#0088FE", "#FFBB28"]; //กำหนดสี
const CardExpenseSummary = () => {
  const { data: dashboardQuery, isLoading } = useGetdashBoardQuery(); //ดึงข้อมูล

  const expenseSummary = dashboardQuery?.expenseSummary[0]; // query จาก expenseSummary ตัวที่0
  //   console.log("Data:", expenseSummary);

  const expenseByCategorySummary =
    dashboardQuery?.expenseByCategory || []; //เช็คว่าข้อมูลมีค่าหรือไม่ ถ้าไม่มีคือ []
  console.log("Data2:", expenseByCategorySummary);

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + "Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const TotalExpense = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );

  const formettedTotalExpense = TotalExpense.toFixed(2);

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="flex justify-center items-center m5 py-48">
          <Image
            src={"/Asset/Loading.gif"}
            alt="logo loading"
            width={70}
            height={50}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center py-5">
            <h3>ExpensSummary</h3>
          </div>

          {/* body*/}
          <div className="xl:flex justify-between pr-7">
            {/* charts */}
            <div className="relative basis-3/5">
              <ResponsiveContainer width={"100%"} height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center basis-2/5">
                <span className="text-xl font-bold">
                  ${formettedTotalExpense}
                </span>
              </div>
            </div>
            {/* Labels Names */}
            <ul className="items-center">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend ${index}`}
                  className="flex items-center text-xs px-7"
                >
                  <span
                    className="mr-3 w-3 h-3 rounded-full items-center gap-2 "
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  <p className="inline items-center py-1.5">{entry.name}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* footer */}
          <div>
            {expenseSummary && (
              <div className="mt-3 justify-between items-center px-9 mb-4">
                <div className="pt-2">
                  <p className="text-sm">Average:</p>
                  <span className="font-semibold">
                    ${expenseSummary.totalExpenses.toFixed(2)}
                  </span>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  25%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;

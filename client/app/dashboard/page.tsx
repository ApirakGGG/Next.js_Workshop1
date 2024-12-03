"use client";
import React from "react";
import CardPopPularProduct from "./CardPopPularProduct";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import StartCard from "./StartCard";
import { Package, TrendingUp, TrendingDown, CheckCircle, Tag } from "lucide-react";

const DashBoard = () => {
  return (
    <div className="custom-grid-rows grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-5 ">
      {/* Grid Top left #Poppular Product */}
      <CardPopPularProduct />
      <CardSalesSummary />
      <CardPurchaseSummary />
      {/* Middle grid #2 */} {/* Grid Bottom */}
      <CardExpenseSummary />
      {/* Right Grid #3 */}
      <StartCard
        title="Customer & Expense"
        primaryIcon={<Package className="text-blue-500 w-6 h-6" />}
        dateRange="22 - 29 November 2023"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercenTage: 131,
            IconComponents: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercenTage: -56,
            IconComponents: TrendingDown,
          },
        ]}
      />
       <StartCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercenTage: 131,
            IconComponents: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "147",
            changePercenTage: -56,
            IconComponents: TrendingDown,
          },
        ]}
      />
      <StartCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercenTage: 20,
            IconComponents: TrendingUp,
          },
          {
            title: "Discount",
            amount: "200.00",
            changePercenTage: -10,
            IconComponents: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default DashBoard;

"use client";

import React, { useEffect } from "react";
import NavBar from "./(Components)/Navbar/NavBar";
import SideBar from "./(Components)/SideBar/SideBar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboarLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // ปรับ class ของ Element ตามค่าของตัวแปร isDarkMode เพื่อเปิดหรือปิดโหมดสี
  useEffect(() => {
    if (isDarkMode) {
      // DarkMode
      document.documentElement.classList.add("dark");
    } else {
      // Light Mode
      document.documentElement.classList.add("light");
    }
  });

  return (
    <>
      {/* //SideBarComponent */}
      <div
        // Class Color Mode
        className={`${
          isDarkMode ? "dark" : "light"
        } flex w-full min-h-screen text-gray-900 bg-gray-50`}
      >
        {/* SideBar */}
        <SideBar />
        {/* SidebarCollarsed //MD:PL-24 for responsive */}
        <main
          className={`flex flex-col w-full h-full py-7 px-19 bg-gray-50
             ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}
        >
          {/* //children parameter */} {/* NavBar */}
          <NavBar />
          {children}
        </main>
      </div>
    </>
  );
};

const Dashboardwraper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboarLayout> {children}</DashboarLayout>
    </StoreProvider>
  );
};

export default Dashboardwraper;

"use client";
import React from "react";
import Image from "next/image";
import { Menu, Bell, Sun, Settings, Moon } from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/app/redux";
import { setIsDarkMode, setIssodebarCollapsed } from "@/state";

//NavBar components
const NavBar = () => {
  // custom hook ที่กำหนดไว้ในโปรเจกต์ (อิงจาก Redux Toolkit)
  const dispatch = useAppDispatch();
  // custom hook ที่ใช้ดึงค่าจาก Redux store
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  // ฟังก์ชันที่ใช้ dispatch action เพื่อเปลี่ยนสถานะ isSidebarCollapsed
  const toggleSidebar = () => {
    dispatch(setIssodebarCollapsed(!isSidebarCollapsed));
  };

  //ตัวแปร set ค่า DarkMode
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Function เปิดปิด DarkMode
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    //Navbar Component margin bottom-7
    <div className="flex justify-between items-center w-full mb-7">
      {/* Navbarฝั่งซ้าย */} {/* Navbar gap ระยะห่างระหว่างทาง 5 */}
      <div className="flex justify-between items-center gap-5">
        {/* Button before Search */}
        <button
          className="px-3 py-3 bg-gray-300 rounded-full hover:bg-blue-300"
          // Toggle SideBar Slide
          onClick={toggleSidebar}
        >
          {/* Menu & Menu */}
          <Menu className="w-4 h-4" />
        </button>

        {/* Search Input */}
        <div className="relative">
          <input
          // type search
            type="search"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-50 rounded-lg md:w-60 border-2 border-gray-300 bg-white focus:outline-none focus:border-blue-300"
          />

          {/* Bell Search Input*/}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex justify-between items-center gap-5">
        {/* responsive md:flex */}
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            {/* button เปลี่ยน Mode */}
            <button onClick={toggleDarkMode}>
              {/* Change Mode โดยการสลับ Icon */}
              {/* logic {isDarkMode ? (set icon) : (set icon)}*/}
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={20} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={20} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={20} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center cursor-pointer gap-3">
            <Image src="" alt="Profiles" width={40} height={40} className="rounded-full object-cover" />
            <span className="font-semibold">Name</span>
          </div>
        </div>
        {/* Settings */}
        <Link href="/setting">
          <Settings className="cursor-pointer text-gray-500" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;

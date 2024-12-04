"use client";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux";
import { setIssodebarCollapsed } from "@/state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

//กำหนด interface types for Sidebar Link
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

// SidebarLink Components
const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname(); // กำหนดpathname
  const isActivate =
    pathname === href || (pathname === "/" && href === "/dashboard"); // กำหนด Path ของ pathname

  return (
    // Sidebar Icon & label & href
    <Link href={href}>
      <div
        // จัดกึ่งกลาง icon sidebar
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start py-4 px-8"
        }
            hover:text-blue-500 hover:bg-blue-100 transition-colors gap-3 ${
              isActivate ? "bg-blue-200 text-white" : ""
            }`}
      >
        {/* Icon Sidebar */}
        <Icon className="w-6 h-6 !text-gray-700" />
        {/* Label span */}
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-semibold text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

// SideBar Components
const SideBar = () => {
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

  // รูปแบบและการจัดตำแหน่ง (CSS styling) ของ Sidebar
  const SideBarClassName = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={SideBarClassName}>
      {/* //LOGO // Sidebar Container // responsive md:justify-normal */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image src="/Asset/NavLogo.gif" alt="LOGO NAV" width={40} height={40} />
        <h1
          // isSidebarCollapsed block text เมื่อปิดSlide
          className={`text-2xl font-extrabold ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          INVENTORY
        </h1>
        {/* Button Responsive md:hidden */}
        <button
          onClick={toggleSidebar}
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {/* Link components & Icon*/}
      <div className="flex-grow mt-8">
        {/* Sidebar link Components */}
        {/* DashBoard */}
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="DASHBOARD"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Inventory */}
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="INVENTORY"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Product */}
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="PRODUCTS"
          isCollapsed={isSidebarCollapsed}
        />
        {/* user */}
        <SidebarLink
          href="/users"
          icon={User}
          label="USER"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Setting */}
        <SidebarLink
          href="/setting"
          icon={SlidersHorizontal}
          label="Setting"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Expensive */}
        <SidebarLink
          href="/expense"
          icon={CircleDollarSign}
          label="EXPENSIVE"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER &copy; => tag */}
      {/* block text เมิ่อปิด Sidebar */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 INVENTORY MANAGE
        </p>
      </div>
    </div>
  );
};

export default SideBar;

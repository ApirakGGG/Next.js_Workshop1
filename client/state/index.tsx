import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//กำหนด ประเภท (type) ของ state สำหรับ slice global
export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

//เป็นค่าตั้งต้นของ state สำหรับ slice global
const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

//ใช้ createSlice จาก Redux Toolkit เพื่อสร้าง slice ที่ชื่อ global
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIssodebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

//ส่งออก actions ที่สร้างจาก reducers เพื่อใช้งานใน component ต่าง ๆ
export const { setIssodebarCollapsed, setIsDarkMode } = globalSlice.actions;

//ส่งออก reducer ของ slice เพื่อใช้งานใน combineReducers
export default globalSlice.reducer;

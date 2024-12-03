/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state"
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

// redux resistence
const createNoopStorage = () => {
  //  การจัดการ storage จริง (เช่น localStorage หรือ sessionStorage)
  //  แต่จริง ๆ แล้วไม่ได้จัดเก็บข้อมูลใด ๆ ลงไปจริง ๆ
  //  โดยเมธอดทั้งหมดคืนค่าเป็น Promise ที่ resolve ทันที
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// สร้างตัวแปร storage ซึ่งใช้สำหรับจัดการข้อมูลใน storage
// โดยการเลือกว่าจะใช้ createNoopStorage() หรือ createWebStorage("local")
//  ขึ้นอยู่กับว่าโค้ดกำลังรันใน environment ไหน
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

//การตั้งค่าที่ใช้กับ Redux Persist เพื่อจัดการการเก็บข้อมูลของ Redux state ใน storage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

// combineReducers จาก Redux เพื่อรวม reducers หลายตัวเข้าด้วยกันเป็น rootReducer
// ซึ่งเป็น reducer หลักของแอปพลิเคชัน Redux
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

// persistedReducer ซึ่งเป็น Redux reducer
// ที่สามารถบันทึกและกู้คืนสถานะ (state) ของ Redux store จาก storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// การเชื่อมระบบ Redux Persist กับ Redux store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefualtMiddleware) =>
      getDefualtMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

// Redux types การตั้งค่าประเภท (type) สำหรับ Redux Store และ Redux Hooks
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Provider
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Provider Component สำหรับการจัดการ Redux Store และ Redux Persist
  // ในแอปพลิเคชัน React โดยใช้ StoreProvider
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

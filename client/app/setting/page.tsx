"use client";
import React, { useState } from "react";
import Header from "@/app/(Components)/Header/Header";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_Doe", type: "text" },
  { label: "Email", value: "john_Doe@gmail.com", type: "text" },
  { label: "Notifications", value: true, type: "toggle" },
  { label: "DarkMode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Setting = () => {
  const [userSetting, setUserSetting] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    setUserSetting((prevSettings) =>
      prevSettings.map((setting, i) =>
        i === index
          ? { ...setting, value: !setting.value as boolean }
          : setting
      )
    );
  };

  const handleTextChange = (index: number, newValue: string) => {
    setUserSetting((prevSettings) =>
      prevSettings.map((setting, i) =>
        i === index ? { ...setting, value: newValue } : setting
      )
    );
  };

  return (
    <div className="w-full">
      <Header name="User Setting" />
      <div className="mt-5 mr-5 shadow-md overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSetting.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={index}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="cursor-pointer items-center relative inline-flex">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-blue-400 peer-focus:ring-4
                          transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                          after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:bg-blue-600 mr-5"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => handleTextChange(index, e.target.value)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Setting;

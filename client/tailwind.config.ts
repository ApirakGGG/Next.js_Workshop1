/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

//เฉดสี
const baseColors = [
  "blue",
  "green",
  "yellow",
  "red",
  "pink",
  "purple",
  "gray",
  "white",
  "black",
];

//ตวามเข้มของสี
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

const generateThemeObject = (colors: any, mapping: any, invert: boolean) => {
  const theme: any = {};
  baseColors.forEach((color) => {
    if (!colors[color]) {
      console.warn(`Color "${color}" is not defined in tailwindcss/colors`);
      return;
    }

    if (color === "white" || color === "black") {
      theme[color] = colors[color]; // ใช้ค่าตรง ๆ ไม่มีเฉดสี
    } else {
      theme[color] = {};
      Object.entries(mapping).forEach(([key, value]: any) => {
        const shadeKey = invert ? value : key;

        if (colors[color][shadeKey]) {
          theme[color][key] = colors[color][shadeKey];
        } else {
          console.warn(
            `Shade "${shadeKey}" is not defined for color "${color}"`
          );
        }
      });
    }
  });
  return theme;
};

//class ของสี
const lightTheme = generateThemeObject(colors, shadeMapping, false);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes), 
    require("tailwind-scrollbar-hide"),
   ],// ปลั๊กอินที่ใช้ซ่อน Scrollbar
} satisfies Config;

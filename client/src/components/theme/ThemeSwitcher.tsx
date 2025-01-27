// app/components/ThemeSwitcher.js
"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { Button } from "../ui/button";
import { MoonIcon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" onClick={toggleTheme}>
      {" "}
      {theme === "light" ? <Sun/> : <MoonIcon/>}{" "}
    </Button>
  );
};
export default ThemeSwitcher;

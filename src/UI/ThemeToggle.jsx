import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-lg bg-button text-theme cursor-pointer transition-all duration-300 flex items-center justify-center text-xl sm:text-2xl leading-none shadow-sm hover:opacity-80"
    >
      {theme === "dark" ? <IoMdSunny /> : <IoMdMoon />}
    </button>
  );
};

export default ThemeToggle;

import { useEffect, useState } from "react";
import { IoMdMoon,IoMdSunny  } from "react-icons/io";
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
  className="p-2 rounded-lg bg-button text-theme cursor-pointer transition-all duration-300 text-2xl max-sm:text-xl"
>
  {theme === "dark" ? <IoMdMoon /> : <IoMdSunny />}
</button>

  );
};

export default ThemeToggle;

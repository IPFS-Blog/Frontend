import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "next-themes";
import { useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [change, setChange] = useState(true);

  const handleThemeChange = () => {
    setChange(!change);
    if (change) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div>
      {theme == "light" ? (
        <div
          onClick={() => handleThemeChange()}
          className="cursor-pointer rounded-xl bg-gray-300 p-2 text-gray-700 hover:bg-gray-400 hover:text-gray-800"
        >
          <Brightness5Icon />
        </div>
      ) : (
        <div
          onClick={() => handleThemeChange()}
          className="cursor-pointer rounded-xl p-2 text-gray-200 hover:bg-gray-500 hover:text-gray-100"
        >
          <DarkModeIcon />
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;

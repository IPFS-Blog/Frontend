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
        <div onClick={() => handleThemeChange()} className="mx-2 cursor-pointer  rounded-full py-2 dark:text-gray-700">
          <Brightness5Icon />
        </div>
      ) : (
        <div onClick={() => handleThemeChange()} className="mx-2 cursor-pointer rounded-full py-2 text-white">
          <DarkModeIcon />
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;

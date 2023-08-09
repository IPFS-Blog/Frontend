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
          className="mx-2 cursor-pointer rounded-md p-2 text-blue-400 hover:border-blue-400 hover:outline-none hover:ring-4"
        >
          <Brightness5Icon />
        </div>
      ) : (
        <div
          onClick={() => handleThemeChange()}
          className="mx-2 cursor-pointer rounded-md p-2 text-blue-500 hover:outline-none hover:ring-4"
        >
          <DarkModeIcon />
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;

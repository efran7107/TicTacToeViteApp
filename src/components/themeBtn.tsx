import { useTheme } from "../functions/providerContext";

export const ThemeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <a
      className="theme-button"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <i className="fa-solid fa-circle-half-stroke"></i>
    </a>
  );
};

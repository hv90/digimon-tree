export const toggleTheme = (callback?: () => void) => {
  if (callback) {
    callback();
  }

  const localTheme = localStorage.getItem("theme");

  if (
    !localTheme ||
    localTheme === "dark" ||
    document.documentElement.classList.contains("dark")
  ) {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  } else {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  }
};

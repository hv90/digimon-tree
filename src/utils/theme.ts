export const toggleTheme = (callback?: () => void) => {
  if (callback) {
    callback();
  }

  setTimeout(() => {
    const localTheme = localStorage.getItem("theme");

    if (
      !localTheme ||
      localTheme === "light" /*  &&
      document.documentElement.classList.contains("dark") */
    ) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, 500);
};

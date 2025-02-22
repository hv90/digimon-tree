export const toggleTheme = (callback?: () => void) => {
  if (callback) {
    callback();
  }
  console.log(
    "changing theme. contains dark? ",
    document.documentElement.classList.contains("dark")
  );
  if (document.documentElement.classList.contains("dark")) {
    // document.documentElement.classList.toggle("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
};

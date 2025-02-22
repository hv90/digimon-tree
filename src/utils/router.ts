export const router = {
  push: (url: string) => {
    window.history.replaceState(
      { ...window.history.state, as: url, url: url },
      "",
      url
    );
  },
};

import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import Page from "./page";

describe("Check if first render is ok", () => {
  it("should render Test component", async () => {
    render(<Page />);
    const loading = screen.getByText("Carregando...");
    expect(loading).toBeInTheDocument();

    waitFor(() => expect(loading).not.toBeInTheDocument());
  });
});

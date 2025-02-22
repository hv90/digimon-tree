import { fireEvent, screen } from "@testing-library/dom";
import { act, render } from "@testing-library/react";
import axios from "axios";
import { digimonTypeSample } from "@/types/digimon.d.ts";
import Page from "@/app/page";

jest.mock("axios", () => {
  const mockAxios = {
    create: jest.fn(() => mockAxios),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    // Inclua outras funções do Axios, conforme necessário
  };

  return mockAxios;
});

const openAutocompleteMenu = async () => {
  const input = screen.getByLabelText("Digimon");
  await act(async () => {
    fireEvent.mouseDown(input);
  });

  return input;
};

const clickOption = async (optionText = "") => {
  const option = screen.getByText(optionText);
  await act(async () => {
    fireEvent.click(option);
  });
};

describe("Check if Search component is ok", () => {
  it("Should select Agumon option", async () => {
    axios.get.mockResolvedValue(digimonTypeSample);

    render(<Page />);

    const input = await openAutocompleteMenu();

    await clickOption("Agumon");

    expect(input.value).not.toBe("gumon");
    expect(input.value).toBe("Agumon");
  });

  it("Should change select option", async () => {
    axios.get.mockResolvedValue(digimonTypeSample);

    render(<Page />);

    await openAutocompleteMenu();
    await clickOption("Agumon");
    const input = await openAutocompleteMenu();
    await clickOption("Gabumon");

    expect(input.value).not.toBe("gumon");
    expect(input.value).toBe("Gabumon");
  });
});

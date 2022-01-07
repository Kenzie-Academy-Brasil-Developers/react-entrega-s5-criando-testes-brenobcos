import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../../components/Search";

describe("Button component", () => {
  test("should be able to render button", () => {
    render(<Search />);

    const searchButton = screen.getByText("Buscar pelo CEP");

    expect(searchButton).toBeTruthy();
  });

  test("button must be disabled", () => {
    render(<Search />);

    const searchButton = screen.getByText("Buscar pelo CEP");

    expect(searchButton).toBeDisabled();
  });
});
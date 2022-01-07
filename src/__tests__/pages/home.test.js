import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import api from "../../services";

import Search from "../../components/Search";
import Address from "../../components/Cep";
import Providers from "../../providers";

const apiMock = new MockAdapter(api);

describe("Page Home", () => {
  test("should be able to search valid zip code", async () => {
    apiMock.onGet("54410280").replyOnce(200, {
      complemento: "at\u00e9 4177/4178",
      bairro: "Piedade",
      cidade: "Jaboat\u00e3o dos Guararapes",
      logradouro: "Rua Jos\u00e9 Nunes da Cunha",
      estado_info: {
        area_km2: "98.076,001",
        codigo_ibge: "26",
        nome: "Pernambuco",
      },
      cep: "54410280",
      cidade_info: { area_km2: "258,694", codigo_ibge: "2607901" },
      estado: "PE",
    });

    render(
      <Providers>
        <Search />
        <Address />
      </Providers>
    );

    const searchButton = screen.getByText("Buscar pelo CEP");
    const searchInput = screen.getByPlaceholderText("Insira o CEP");

    userEvent.type(searchInput, "54410280");
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByDisplayValue("Rua José Nunes da Cunha")
      ).toBeInTheDocument();
    });
  });
});
it("Search valid zip code", () => {
  cy.visit("http://localhost:3000");
  cy.viewport(1440, 900);
  cy.intercept("GET", `https://api.postmon.com.br/v1/cep/${"54410280"}`).as(
    "CEP"
  );
  cy.get("[placeholder='Insira o CEP']").type("54410280");
  cy.contains("Buscar pelo CEP").click();

  cy.get(".Address");
});

it("Seach invalid zip code", () => {
  cy.visit("http://localhost:3000");
  cy.viewport(1440, 900);
  cy.intercept("GET", `https://api.postmon.com.br/v1/cep/${"544102"}`).as(
    "CEP"
  );
  cy.get("[placeholder='Insira o CEP']").type("544102");
  cy.contains("Buscar pelo CEP").click();
  cy.contains("CEP inválido! São necessários 8 números");
});

it("Search with empty input", () => {
  cy.visit("http://localhost:3000");
  cy.viewport(1440, 900);
  cy.get("[placeholder='Insira o CEP']").should("be.empty");
  cy.contains("Buscar pelo CEP").should("be.disabled");
});

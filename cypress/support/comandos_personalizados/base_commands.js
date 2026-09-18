Cypress.Commands.add("Login", () => {
  cy.get('[data-test="username"]').type(Cypress.env("username"));
  cy.get('[data-test="password"]').type(Cypress.env("password"), { log: false });
  cy.get("#login-button").click();
});

Cypress.Commands.add("AdicionarItemCarrinho", (index) => {
  cy.get(".shopping_cart_link")
    .invoke("text")
    .then((qtdInicial) => {
      const valorInicial = parseInt(qtdInicial, 10) || 0;
      cy.get(".btn_primary.btn_inventory").eq(index).click();
      cy.get(".shopping_cart_link")
        .invoke("text")
        .then((novoTexto) => {
          const valorEsperado = String(valorInicial + 1);
          expect(novoTexto).to.equal(valorEsperado);
        });
    });
});

Cypress.Commands.add("Logout", () => {
  cy.get(".bm-burger-button").click();
  cy.get("#logout_sidebar_link").click();
});

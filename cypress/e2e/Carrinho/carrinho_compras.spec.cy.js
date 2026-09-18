import { cartElement } from "./carrinho.elements.js";

describe("Testes de validação para Carrinho de compras", () => {
  beforeEach(() => {
    setTimeout(60000);
    cy.visit("/");
    cy.Login();
  });

  it("Adicionar itens no carrinho", () => {
    cy.get(cartElement.btnCarrinho)
      .invoke("text")
      .then((qtdInicial) => {
        // Converte o texto inicial em um número inteiro
        const valorInicial = parseInt(qtdInicial, 10) || 0;
        // Clica no botão para adicionar um item ao carrinho
        cy.get(cartElement.btnInventario).first().click();
        // Verifica se o valor atualizado é o esperado
        cy.get(cartElement.btnCarrinho)
          .invoke("text")
          .then((novoTexto) => {
            // Converte o valor esperado de volta para string antes de comparar
            const valorEsperado = String(valorInicial + 1);
            // Compara a string do novo valor com o valor esperado
            expect(novoTexto).to.equal(valorEsperado);
          });
      });
  });

  it("Remover itens do carrinho de compras", () => {
    cy.get(cartElement.btnInventario).first().click();
    cy.get(cartElement.btnCarrinho).click();
    cy.get(cartElement.btnRemove).click();
    cy.get(cartElement.titleItemCart).should("not.exist");
  });

  it("Atualizar itens do carrinho de compras", () => {
    cy.AdicionarItemCarrinho(0);
    cy.AdicionarItemCarrinho(1);
  });

  it("Manutenção do carrinho após logout e login", () => {
    cy.AdicionarItemCarrinho(3);
    cy.Logout();
    cy.Login();
    cy.AdicionarItemCarrinho(4);
  });

  it("Avançar tela de carrinho sem inserir produto", () => {
    cy.get(cartElement.btnCarrinho).click();
    cy.get(cartElement.btnCheckout).click();

    cy.contains(cartElement.error_carrinho, "Cart is empty").should("be.visible");
  });
});

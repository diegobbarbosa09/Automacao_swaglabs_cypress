import { faker as FakerJs } from "@faker-js/faker";
import { cartElement } from "../Carrinho/carrinho.elements.js";
import { checkElement } from "../Checkout/checkout.elements.js";
import { buyElement } from "./compra.elements.js";

describe("fluxos de compras swaglabs", () => {
  beforeEach(() => {
    setTimeout(60000);
    cy.visit("/");
    cy.Login();
  });

  it("Realizar compra", () => {
    cy.get(cartElement.btnInventario).first().should("be.visible");
    cy.get(cartElement.btnInventario).first().click();
    cy.get(cartElement.btnCarrinho).click();
    cy.get(checkElement.btnCheckout).click();
    cy.get(checkElement.inptFirstname).type(FakerJs.person.firstName());
    cy.get(checkElement.inptLastname).type(FakerJs.person.lastName());
    cy.get(checkElement.inptPostalcode).type("00000000");
    cy.contains(checkElement.btnContinnue).click();
    cy.contains(checkElement.btnFinish).click();
    const itensPagina = ["THANK YOU FOR YOUR ORDER"];
    itensPagina.forEach((itensPagina) => {
      cy.get(buyElement.itens_pagina).should("contain", itensPagina);
    });
    cy.get("img.pony_express").should("exist");
  });

  it("Finalizar compra com carrinho vazio", () => {
    cy.get(cartElement.btnInventario).first().should("be.visible");
    cy.get(cartElement.btnCarrinho).click();
    cy.get(checkElement.btnCheckout).click();
    cy.get(checkElement.inptFirstname).type(FakerJs.person.firstName());
    cy.get(checkElement.inptLastname).type(FakerJs.person.lastName());
    cy.get(checkElement.inptPostalcode).type("00000000");
    cy.contains(checkElement.btnContinnue).click();
    cy.contains(checkElement.btnFinish).click();
    cy.contains(buyElement.error_compra, "Carrinho vazio").should("be.visible");
  });
});

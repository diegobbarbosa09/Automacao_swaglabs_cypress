import { faker as FakerJs } from "@faker-js/faker";
import { checkElement } from "./checkout.elements.js";

describe("Testes de validação de checkout information e overview", () => {
  beforeEach(() => {
    setTimeout(60000);
    cy.visit("/");
    cy.Login();
    cy.get(checkElement.btnCarrinho).click();
    cy.get(checkElement.btnCheckout).click();
  });

  it("Validação de campos obrigatorios checkout your information", () => {
    cy.get(checkElement.inptContinue).click();
    cy.contains(checkElement.error_checkout, "Error: First Name is required").should("be.visible");
    cy.get(checkElement.inptFirstname).should("have.class", "error");
    cy.get(checkElement.inptFirstname).type(FakerJs.person.firstName());
    cy.get(checkElement.inptContinue).click();
    cy.contains(checkElement.error_checkout, "Error: Last Name is required").should("be.visible");
    cy.get(checkElement.inptLastname).should("have.class", "error");
    cy.get(checkElement.inptLastname).type(FakerJs.person.lastName());
    cy.get(checkElement.inptContinue).click();
    cy.contains(checkElement.error_checkout, "Error: Postal Code is required").should("be.visible");
    cy.get(checkElement.inptPostalcode).should("have.class", "error");
  });

  it("Preenchimento das checkout your information", () => {
    cy.get(checkElement.inptFirstname).type(FakerJs.person.firstName());
    cy.get(checkElement.inptLastname).type(FakerJs.person.lastName());
    cy.get(checkElement.inptPostalcode).type(FakerJs.location.zipCode());
    cy.get(checkElement.inptContinue).click();
    const sumaryInfo = [
      "Checkout: Overview",
      "Payment Information:",
      "SauceCard #31337",
      "Shipping Information:",
      "Free Pony Express Delivery!",
      "Price Total",
      "Cancel",
      "Finish",
    ];
    sumaryInfo.forEach((sumaryInfo) => {
      cy.get(checkElement.btnPagina).should("contain", sumaryInfo);
    });
  });
});

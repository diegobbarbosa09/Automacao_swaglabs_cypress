import { loginElement } from "./login.elements.js";

describe("Testes de validação de login", () => {
  beforeEach(() => {
    cy.visit("/", {
      timeout: 60000,
    });
  });

  it("Login e logout com credenciais válidas", () => {
    cy.env(["username", "password"]).then(({ username, password }) => {
      cy.get(loginElement.inptUsername).type(username);
      cy.get(loginElement.inptPassword).type(password, { log: false });
    });

    cy.get(loginElement.btnlogin).click();

    cy.contains(loginElement.title, "Products").should("be.visible");

    cy.get(loginElement.btnburgerMenu).click();
    cy.get(loginElement.btnlogout).click();

    cy.url().should("include", "/");
  });

  it("Login com credenciais inválidas", () => {
    cy.env(["userinvalid", "passinvalid"]).then(({ userinvalid, passinvalid }) => {
      cy.get(loginElement.inptUsername).type(userinvalid);
      cy.get(loginElement.inptPassword).type(passinvalid, {
        log: false,
      });
    });

    cy.get(loginElement.btnlogin).click();

    const validarErro = ["Epic sadface:", "Username and password do not match any user in this service"];

    validarErro.forEach((mensagem) => {
      cy.contains(loginElement.error_login, mensagem).should("be.visible");
    });
  });

  it("Validação de campos obrigatórios", () => {
    cy.env(["username", "password"]).then(({ username, password }) => {
      // Validação: senha obrigatória
      cy.get(loginElement.inptUsername).type(username);

      cy.get(loginElement.btnlogin).click();

      const validarErroSenha = ["Epic sadface:", "Password is required"];

      validarErroSenha.forEach((mensagem) => {
        cy.contains(loginElement.error_login, mensagem).should("be.visible");
      });

      // Limpa usuário
      cy.get(loginElement.inptUsername).clear();

      // Validação: usuário obrigatório
      cy.get(loginElement.inptPassword).type(password, {
        log: false,
      });

      cy.get(loginElement.btnlogin).click();

      const validarErroUsuario = ["Epic sadface:", "Username is required"];

      validarErroUsuario.forEach((mensagem) => {
        cy.contains(loginElement.error_login, mensagem).should("be.visible");
      });
    });
  });

  it("Validação de usuário bloqueado", () => {
    cy.env(["userlock", "password"]).then(({ userlock, password }) => {
      cy.get(loginElement.inptUsername).type(userlock);

      cy.get(loginElement.inptPassword).type(password, {
        log: false,
      });
    });

    cy.get(loginElement.btnlogin).click();

    const validarErroBlock = ["Epic sadface:", "Sorry, this user has been locked out."];

    validarErroBlock.forEach((mensagem) => {
      cy.contains(loginElement.error_login, mensagem).should("be.visible");
    });
  });

  it("Deve invalidar a sessão após o logout", () => {
    cy.env(["username", "password"]).then(({ username, password }) => {
      cy.get(loginElement.inptUsername).type(username);

      cy.get(loginElement.inptPassword).type(password, {
        log: false,
      });
    });

    cy.get(loginElement.btnlogin).click();

    // Logout
    cy.get(loginElement.btnburgerMenu).click();
    cy.get(loginElement.btnlogout).click();

    // Tenta acessar página protegida após logout
    cy.visit("/inventory.html", {
      failOnStatusCode: false,
    });

    cy.url().should("include", "/");

    const validarErro = ["Epic sadface:", "You can only access '/inventory.html' when you are logged in."];

    validarErro.forEach((mensagem) => {
      cy.contains(loginElement.error_login, mensagem).should("be.visible");
    });
  });
});

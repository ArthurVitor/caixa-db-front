describe("testando página de vendas", () => {
  it("páginas de listagem", () => {
    cy.visit("http://localhost:5173/vendas");

    cy.get("p").first().should("contain", "Listando todas as vendas");
    cy.get("thead").find("th").should("have.length", 7);
  });

  it("página de criação de venda", () => {
    cy.visit("http://localhost:5173/vendas/1/criar-venda");

    cy.get("h1").first().should("contain", "NOVA VENDA");
  });
});

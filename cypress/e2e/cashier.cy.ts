describe("Testando página de caixa único", () => {
    it("Página única do caixa 3", () => {
        cy.visit("http://localhost:5173/caixas/true/3");

        cy.get("p").first().should("contain", "Caixa");
        cy.get("p").eq(1).should("contain", "Aberto desde: ");
    });

    it('Adicionar venda', () => {
        cy.visit("http://localhost:5173/caixas/true/3");
        cy.get('Button.custom-button-toggled').click();
        cy.url().should('include', '/vendas/3/criar-venda');
    });

})


describe("Testando página de produtos", () => {
    it("Listagem dos produtos", () => {
        cy.visit("http://localhost:5173/produtos");

        cy.get("h3").first().should("contain", "Listando todos os produtos");
        cy.get("thead").find("th").should("have.length", 6);
    });

    it('Adicionar produto', () => {
        cy.visit("http://localhost:5173/produtos");
        cy.get('button.custom-button-toggled.new-product').should('be.visible').click();
        cy.url().should('include', '/produtos/criar-produto');
    });

})

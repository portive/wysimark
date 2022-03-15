context("Editor", () => {
  it("should load editor and find the 'rich' in editor", async () => {
    cy.visit("http://localhost:3005/cypress/basic")
    cy.get("[data-cy=editor]").should("contain", "rich")
  })

  it.only("should bold some text", async () => {
    cy.visit("http://localhost:3005/cypress/basic")
    cy.get("[data-cy=editor]").focus().type("{selectAll}")
  })
})

describe("Category API", () => {
    const apiUrl = "http://localhost:3000/api/categories"; // 修正されたAPIエンドポイント
  
    it("GET /api/categories - should return a list of categories", () => {
      cy.request("GET", apiUrl).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
      });
    });
  
    it("POST /api/categories - should create a new category", () => {
      const newCategory = { name: "テストカテゴリ" };
  
      cy.request("POST", apiUrl, newCategory).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name", newCategory.name);
      });
    });
  
    it("POST /api/categories - should return 400 for invalid data", () => {
      cy.request({
        method: "POST",
        url: apiUrl,
        failOnStatusCode: false, // 400エラーでもテストを継続
        body: {},
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error", "カテゴリ名が必要です");
      });
    });
  
    it("GET /api/categories - should include the newly created category", () => {
      cy.request("GET", apiUrl).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.satisfy((categories: any[]) =>
          categories.some((cat) => cat.name === "テストカテゴリ")
        );
      });
    });
  });
  
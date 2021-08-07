import { Application } from "express";
import request from "supertest";
import App from "../../src/app";
import { HelloWorldRoute } from "../../src/routes/HelloWorldRoute";

describe("Hello World routes", () => {
  let app: Application;
  beforeEach(() => {
    const routes = [new HelloWorldRoute()];
    app = new App(routes).app;
  });
  it("should return 200", async () => {
    // Arrange & Act
    const response = await request(app).get("/v1/hello-world");
    // Assert
    expect(response.statusCode).toEqual(200);
  });
  it('should return a JSON payload with a "HelloWorld!" message', async () => {
    // Arrange & Act
    const response = await request(app).get("/v1/hello-world");
    // Assert
    expect(response.body).toEqual({ message: "Hello World!" });
  });
});

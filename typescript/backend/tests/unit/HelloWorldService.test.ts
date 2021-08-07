import { EnglishHelloWorldService } from "../../src/services/HelloWorldService";

describe("the EnglishHelloWorldService", () => {
  it("should say Hello World", () => {
    // Arrange
    const sut = new EnglishHelloWorldService();
    // Act
    const actual = sut.sayHello();
    // Assert
    expect(actual).toEqual("Hello World!");
  });
});

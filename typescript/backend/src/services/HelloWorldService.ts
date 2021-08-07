interface HelloWorldService {
  sayHello: () => string;
}

class EnglishHelloWorldService implements HelloWorldService {
  public sayHello() {
    return "Hello World!";
  }
}

export { HelloWorldService, EnglishHelloWorldService };

import { Router } from "express";
import { HelloWorldController } from "../controllers/HelloWorldController";
import { Route } from "../interfaces/route";

class HelloWorldRoute implements Route {
  public path = "/v1/hello-world";
  public router = Router();
  public controller = new HelloWorldController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.sayHello);
  }
}

export { HelloWorldRoute };

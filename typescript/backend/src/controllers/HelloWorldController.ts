import { NextFunction, Request, Response } from "express";
import {
  EnglishHelloWorldService,
  HelloWorldService,
} from "../services/HelloWorldService";
import {
  DefaultLoggingService,
  LoggingService,
} from "../services/LoggingService";

class HelloWorldController {
  constructor(
    private loggingService: LoggingService = new DefaultLoggingService(),
    private helloWorldService: HelloWorldService = new EnglishHelloWorldService()
  ) {}

  public sayHello = async (req: Request, res: Response, _: NextFunction) => {
    this.loggingService.info("Saying Hello World...");
    return res.json({ message: this.helloWorldService.sayHello });
  };
}

export { HelloWorldController };

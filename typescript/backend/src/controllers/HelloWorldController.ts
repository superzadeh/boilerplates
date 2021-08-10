import { Request, Response } from "express";
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

  public sayHello = async (req: Request, res: Response) => {
    this.loggingService.info("Saying Hello World...");
    return res.status(200).json({ message: this.helloWorldService.sayHello() });
  };
}

export { HelloWorldController };

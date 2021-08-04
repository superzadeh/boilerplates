import { NextFunction, Request, Response } from "express";
import {
  DefaultLoggingService,
  LoggingService,
} from "../services/LoggingService";

class HelloWorldController {
  private loggingService: LoggingService;

  constructor(loggingService: LoggingService = new DefaultLoggingService()) {
    this.loggingService = loggingService;
  }

  public sayHello = async (req: Request, res: Response, next: NextFunction) => {
    this.loggingService.info("Saying Hello World...");
    return res.json({ message: "Hello World" });
  };
}

export { HelloWorldController };

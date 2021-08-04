import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import logger from "morgan";
import "reflect-metadata";
import { Route } from "./interfaces/route";
import { errorMiddleware } from "./middlewares/errorMiddleware";

class App {
  public app: express.Application;
  public port: string | number;
  public isProduction: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.isProduction = process.env.NODE_ENV === "production" ? true : false;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.isProduction) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger("combined"));
      this.app.use(cors({ origin: process.env.HOSTNAME, credentials: true }));
    } else {
      this.app.use(logger("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

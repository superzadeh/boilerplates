import "dotenv/config";

import App from "./app";
import { HelloWorldRoute } from "./routes/HelloWorldRoute";
import { validateEnv } from "./utils/validateEnv";

validateEnv();

const app = new App([new HelloWorldRoute()]);

app.listen();

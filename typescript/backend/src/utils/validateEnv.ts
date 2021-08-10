import { cleanEnv, str, port } from "envalid";

interface envConfiguration {
  NODE_ENV: string;
  JAEGER_HOST: string;
  JAEGER_PORT: number;
  PORT: number;
}

function validateEnv(): envConfiguration {
  return cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "test", "production", "staging"],
    }),
    JAEGER_HOST: str({
      devDefault: "jaeger",
      desc: "hostname of the jaeger collector",
    }),
    JAEGER_PORT: port({
      devDefault: 3000,
      desc: "UDP port of the jaeger collector",
    }),
    PORT: port({
      devDefault: 3000,
      desc: "TCP port on which the server will listen",
    }),
  });
}

export { validateEnv };

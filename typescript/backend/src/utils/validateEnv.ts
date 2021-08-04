import { cleanEnv, str, url, port } from "envalid";

interface envConfiguration {
  NODE_ENV: string;
  TRACING_GRPC_ENDPOINT: string;
  PORT: number;
}

function validateEnv(): envConfiguration {
  return cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "test", "production", "staging"],
    }),
    TRACING_GRPC_ENDPOINT: url({
      example: "grpc://jaeger:6832",
      desc: "Endpoint that will collect OpenTelemetry traces over GRPC",
    }),
    PORT: port({
      devDefault: 3000,
      desc: "TCP port on which the server will listen",
    }),
  });
}

export { validateEnv };

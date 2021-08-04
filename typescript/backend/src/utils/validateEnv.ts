import { cleanEnv, str, url, port } from "envalid";

interface envConfiguration {
  NODE_ENV: string;
  TRACING_GRPC_ENDPOINT: string;
  PORT: number;
}

function validateEnv(): envConfiguration {
  return cleanEnv(process.env, {
    NODE_ENV: str(),
    TRACING_GRPC_ENDPOINT: url(),
    PORT: port(),
  });
}

export { validateEnv };

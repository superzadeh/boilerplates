import "dotenv/config";
import { ExporterConfig, JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NodeTracerProvider } from "@opentelemetry/node";
import { SimpleSpanProcessor } from "@opentelemetry/tracing";
import { Resource } from "@opentelemetry/resources";
import { validateEnv } from "./utils/validateEnv";

const env = validateEnv();

/* Uncomment to inspect/debug tracing issues
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
//*/

const serviceResource = new Resource({
  "service.name": "backend",
});

const provider: NodeTracerProvider = new NodeTracerProvider({
  resource: serviceResource,
});

const options: ExporterConfig = {
  tags: [],
  host: env.JAEGER_HOST,
  port: env.JAEGER_PORT,
  maxPacketSize: 65000,
};
const exporter = new JaegerExporter(options);

/*
// Alternative for a generic GRPC OTLP Collector:
import * as grpc from "@grpc/grpc-js";
const metadata = new grpc.Metadata();
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector-grpc";
const exporter = new CollectorTraceExporter({
  metadata,
  attributes: {
    "service.name": "backend",
  },
  url: env.TRACING_GRPC_ENDPOINT,
  credentials: grpc.credentials.createSsl(),
});
*/

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, () => provider.shutdown().catch(console.error));
});

// Register instrumentations
registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
});

console.log("Tracing Initialized ✅");

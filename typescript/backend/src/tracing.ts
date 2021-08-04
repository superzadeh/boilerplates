import "dotenv/config";
import * as grpc from "@grpc/grpc-js";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector-grpc";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NodeTracerProvider } from "@opentelemetry/node";
import { SimpleSpanProcessor } from "@opentelemetry/tracing";
import { Resource } from "@opentelemetry/resources";

const serviceResource = new Resource({
  "service.name": "backend",
});

// Set GRPC headers on metadata (if any)
const metadata = new grpc.Metadata();

const provider: NodeTracerProvider = new NodeTracerProvider({
  resource: serviceResource,
});
const exporter = new CollectorTraceExporter({
  metadata,
  attributes: {
    "service.name": "backend",
  },
  url: process.env.TRACING_GRPC_ENDPOINT,
  credentials: grpc.credentials.createSsl(),
});
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

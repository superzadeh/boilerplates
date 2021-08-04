/**
 * Proxy for logging to that adds utility to the logger
 * - Disable logs during tests
 */
interface LoggingService {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(error: Error, description?: string, ...args: any[]): void;
}

class DefaultLoggingService implements LoggingService {
  private shouldLog(): boolean {
    return process.env.NODE_ENV !== "test";
  }

  debug(...args: any[]) {
    if (this.shouldLog()) {
      console.debug("DEBUG:", ...args);
    }
  }
  info(...args: any[]) {
    if (this.shouldLog()) {
      console.info("INFO:", ...args);
    }
  }
  warn(...args: any[]) {
    if (this.shouldLog()) {
      console.warn("WARN:", ...args);
    }
  }
  error(error: Error, description?: string, ...args: any[]) {
    if (this.shouldLog()) {
      if (description) {
        console.error("ERROR:", description, error, ...args);
      } else {
        console.error("ERROR:", error, ...args);
      }
      if (process.env.NODE_ENV === "production") {
        // add error/crash reporting here
      }
    }
  }
}

export { LoggingService, DefaultLoggingService };

import { Injectable, Logger, LogLevel } from '@nestjs/common';

@Injectable()
export class AppLogger extends Logger {
  log(message: string, context?: string) {
    super.log(message, context);
  }

  // This function is used to log an error message
  error(message: string, trace?: string, context?: string) {
    // Call the super class's error function with the message, trace, and context
    super.error(message, trace, context);
  }

  // This function is used to log a warning message
  // This function is used to log a warning message
  warn(message: string, context?: string) {
    // Call the parent class's warn function with the message and context
    super.warn(message, context);
  }

  // This function is used to log debug messages to the console
  // It takes in a message and an optional context as parameters
  debug(message: string, context?: string) {
    // This line calls the debug function from the parent class and passes in the message and context
    super.debug(message, context);
  }

  // This function logs a message with a given context
  verbose(message: string, context?: string) {
    // Call the parent class's verbose function with the given message and context
    super.verbose(message, context);
  }
}

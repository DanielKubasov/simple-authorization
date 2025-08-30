import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.getResponse() as { message: string };
        const stacktrace = exception.stack;

        const logger = new Logger();

        logger.error(exception, stacktrace);

        // Make as global var.

        const IS_DEV = process.env.NODE_ENV === 'development';

        if (IS_DEV) {
            response.status(status).json({
                statusCode: status,
                message:
                    message.message === undefined ? message : message.message,
                error: exception.name,
                stacktrace,
            });
        } else {
            response.status(status).json({
                statusCode: status,
                message:
                    message.message === undefined ? message : message.message,
                error: exception.name,
            });
        }
    }
}

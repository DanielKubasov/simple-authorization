import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        console.log(
            'This is a log of exception object {} from global catch filter !',
        );
        console.log(
            '**************************************************************',
        );
        console.log(exception);
        console.log(
            '**************************************************************',
        );
        const responseBody = {
            statusCode: httpStatus,
            message: 'Internal Server Error, Check Your Log ??',
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

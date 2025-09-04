import { AppModule } from './core/app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const logger = new Logger();

    const configService = app.get(ConfigService);
    const config = {
        PORT: configService.getOrThrow<string>('PORT'),
        MODE: configService.getOrThrow<string>('NODE_ENV'),
    };

    const swagger = new DocumentBuilder()
        .setTitle('Simple authorization')
        .setDescription('...')
        .setVersion('1.0')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, swagger);

    SwaggerModule.setup('documentation', app, documentFactory);

    app.setGlobalPrefix('api/v1');

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(config.PORT, () => {
        logger.verbose(
            `Application started in "${config.MODE}" mode on port: ${config.PORT}`,
        );
    });
}

bootstrap();

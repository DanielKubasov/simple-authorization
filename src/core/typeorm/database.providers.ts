import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        import: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (c: ConfigService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: c.getOrThrow('POSTGRES_HOST'),
                port: c.getOrThrow('POSTGRES_PORT'),
                username: c.getOrThrow('POSTGRES_USER'),
                password: c.getOrThrow('POSTGRES_PASSWORD'),
                database: c.getOrThrow('POSTGRES_DB'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations'],
                migrationsTableName: 'migrations',
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];

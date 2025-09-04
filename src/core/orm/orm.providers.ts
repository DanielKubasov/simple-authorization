import { User } from '@/modules/user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const ormProviders = [
    {
        import: [ConfigModule],
        provide: 'DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (c: ConfigService) => {
            const host = c.getOrThrow<string>('POSTGRES_HOST');
            const port = c.getOrThrow<number>('POSTGRES_PORT');
            const username = c.getOrThrow<string>('POSTGRES_USER');
            const password = c.getOrThrow<string>('POSTGRES_PASSWORD');
            const database = c.getOrThrow<string>('POSTGRES_DB');

            const dataSource = new DataSource({
                type: 'postgres',
                host,
                port,
                username,
                password,
                database,
                entities: [User],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];

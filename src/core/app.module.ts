import { OrmModule } from './orm/orm.module';
import { UserModule } from '@/modules/auth/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        OrmModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

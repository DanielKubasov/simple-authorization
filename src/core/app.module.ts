import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/auth/user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        UserModule,
        TypeormModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}

import { userProviders } from './providers/user.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UserController],
    providers: [...userProviders, UserService],
    exports: [UserService, ...userProviders],
})
export class UserModule {}

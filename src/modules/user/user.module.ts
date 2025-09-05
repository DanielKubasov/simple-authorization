import { userProviders } from './providers/user.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StorageModule } from '@/core/storage/storage.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [StorageModule],
    controllers: [UserController],
    providers: [...userProviders, UserService],
    exports: [UserService, ...userProviders],
})
export class UserModule {}

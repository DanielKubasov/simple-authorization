import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [StorageService],
    controllers: [StorageController],
    exports: [StorageService],
})
export class StorageModule {}

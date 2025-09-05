import { StorageService } from './storage.service';
import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post('/file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({
                        maxSize: 1_048_576, // 10MB
                        message: 'File is too large. Max file size is 10MB',
                    }),
                ],
                fileIsRequired: true,
            }),
        )
        file: Express.Multer.File,
        @Body('isPublic') isPublic: string,
    ) {
        const isPublicBool = isPublic === 'true' ? true : false;
        return this.storageService.uploadSingleFile({
            file,
            isPublic: isPublicBool,
        });
    }

    @Get(':key')
    async getFileUrl(@Param('key') key: string) {
        return this.storageService.getFileUrl(key);
    }

    @Get('/signed-url/:key')
    async getSingedUrl(@Param('key') key: string) {
        return this.storageService.getFileUrl(key);
    }

    @Delete(':key')
    async deleteFile(@Param('key') key: string) {
        return this.storageService.deleteFile(key);
    }
}

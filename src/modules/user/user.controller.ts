import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from '@/decorators/user.decorator';
import { User as UserType } from '@/modules/user/entities/user.entity';
import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string) {
        return this.userService.findOne(uuid);
    }

    @Patch(':uuid')
    update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(uuid, updateUserDto);
    }

    @Delete(':uuid')
    remove(@Param('uuid') uuid: string) {
        return this.userService.remove(uuid);
    }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    uploadAvatar(
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
        @User()
        user: UserType,
    ) {
        return this.userService.uploadAvatar(user.uuid, file);
    }
}

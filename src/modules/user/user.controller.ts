import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

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
}

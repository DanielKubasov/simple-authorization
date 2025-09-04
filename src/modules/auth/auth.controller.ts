import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '@/decorators/public.decorator';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/sign-in')
    public async signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }

    @Public()
    @Post('/sign-up')
    public async signUp(@Body() dto: CreateUserDto) {
        return this.authService.signUp(dto);
    }
}

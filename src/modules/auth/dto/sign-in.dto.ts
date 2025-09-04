import { SignUpDto } from './sign-up.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto implements Partial<SignUpDto> {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

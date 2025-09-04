import { User } from '../entities/user.entity';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class CreateUserDto implements Partial<User> {
    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    public password: string;

    @IsNotEmpty()
    @IsString()
    public firstName: string;

    @IsNotEmpty()
    @IsString()
    public middleName: string;

    @IsNotEmpty()
    @IsString()
    public lastName: string;

    @IsNotEmpty()
    @IsNumber()
    public age: number;

    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public phoneNumber: string;
}

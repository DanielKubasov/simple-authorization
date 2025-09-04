import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    public username: string;

    @IsString()
    @IsOptional()
    public firstName: string;

    @IsString()
    @IsOptional()
    public middleName: string;

    @IsString()
    @IsOptional()
    public lastName: string;

    @IsNumber()
    @IsOptional()
    public age: number;

    @IsString()
    @IsOptional()
    public email: string;

    @IsString()
    @IsOptional()
    public phoneNumber: string;
}

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '@/modules/user/entities/user.entity';
import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    public constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    public async signIn(dto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOneBy([
            { email: dto.username },
            { username: dto.username },
        ]);

        if (!user) {
            throw new BadRequestException('User does not exist.');
        }

        if (!(await verify(user.password, dto.password))) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const payload = { sub: user.uuid, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    public async signUp(dto: CreateUserDto) {
        const user = await this.userService.create(dto);
        const payload = { sub: user.uuid, username: user.username };

        return {
            ...user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

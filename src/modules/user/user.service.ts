import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    public constructor(
        @Inject('USER_REPOSITORY')
        private readonly usersRepository: Repository<User>,
    ) {}

    public async create(createUserDto: CreateUserDto) {
        const existing = await this.usersRepository.findOne({
            where: [
                {
                    email: createUserDto.email,
                },
                {
                    username: createUserDto.username,
                },
            ],
        });

        const hashed = await hash(createUserDto.password);

        if (existing) {
            throw new BadRequestException('User already exists.');
        }

        const user = await this.usersRepository.create({
            ...createUserDto,
            password: hashed,
        });

        await this.usersRepository.save(user);

        return user;
    }

    public async findAll() {
        const users = await this.usersRepository.find();

        return users;
    }

    public async findOne(uuid: string) {
        const user = await this.usersRepository.findOneBy({ uuid });

        if (!user) {
            throw new BadRequestException(`User with uuid ${uuid} not found `);
        }

        return user;
    }

    public async update(uuid: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOneBy({ uuid });

        if (!user) {
            throw new BadRequestException(`User with uuid ${uuid} not found `);
        }

        console.log(user);

        return this.usersRepository.save({ ...user, ...updateUserDto });
    }

    public async remove(uuid: string) {
        const user = await this.usersRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!user) {
            throw new BadRequestException(`User with uuid ${uuid} not found.`);
        }

        await this.usersRepository.remove(user);

        return user;
    }
}

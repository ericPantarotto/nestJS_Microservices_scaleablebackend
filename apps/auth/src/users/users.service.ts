/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Role, User } from '@app/common';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      roles: createUserDto.roles?.map((roleDto) => new Role(roleDto)),
    });
    return this.usersRepository.create(user);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!user || !passwordIsValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.usersRepository.findOne(getUserDto);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({
        email: createUserDto.email,
      });
    } catch {
      return;
    }
    throw new UnprocessableEntityException(
      `User with email ${createUserDto.email} already exists`,
    );
  }

  findAll() {
    return this.usersRepository.find({});
  }
}

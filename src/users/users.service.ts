import { ResetPasswordDto } from './../auth/dto/resetPassword.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll() {
    const userArray = await this.userRepository.find();

    return {
      users: userArray.map((user) => UserDto.from(user)),
      success: true,
    };
  }

  public async findByCpf(userCpf: string): Promise<any | null> {
    const user = await this.userRepository.findOne({ cpf: userCpf });

    return {
      user: UserDto.from(user),
      success: true,
    };
  }

  public async findByEmail(userEmail: string): Promise<any | null> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  public async findByCpfOrEmail(cpf: string, email: string) {
    let user =
      (await this.userRepository.findOne({ cpf: cpf })) ||
      (await this.userRepository.findOne({ email: email }));

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(updateUserDto.id);
    if (!user) {
      return {
        users: [],
        success: false,
      };
    }

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
      await user.hashPassword();
    }

    user.role = updateUserDto.role || user.role;
    user.permissions = updateUserDto.permissions || user.permissions;

    await this.userRepository.save(user);
    let updatedUser = await this.userRepository.findOne(updateUserDto.id);

    return {
      users: [UserDto.from(updatedUser)],
      success: true,
    };
  }

  public async register(userDto: CreateUserDto): Promise<any> {
    const { email, cpf } = userDto;
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = await this.userRepository.findOne({ where: { cpf } });
      if (!user) {
        user = await this.userRepository.create(userDto);
        const createdUser = await this.userRepository.save(user);
        return { user: UserDto.from(createdUser), success: true };
      }
    }

    return {
      success: false,
      message: 'email ou cpf já cadastrados!',
    };
  }
}

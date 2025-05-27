import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createInitialUsers();
  }

  @Post('create-initial-users')
  async createInitialUsers() {
    try {
      await this.userService.createInitialUsers();
      return { message: 'Usuários iniciais criados ou já existem no banco.' };
    } catch (error) {
      return { message: 'Erro ao criar usuários iniciais', error: error.message };
    }
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return { message: 'Usuário não encontrado' };
    }
    return user;
  }
}
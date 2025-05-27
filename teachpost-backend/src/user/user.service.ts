import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createInitialUsers(): Promise<void> {
    const users = await this.userRepository.find(); // Verifica se já existem usuários no banco

    if (users.length === 0) {
      const user1 = this.userRepository.create({
        name: 'Aluno',
        email: 'aluno@teste.com',
        password: await bcrypt.hash('1234', 10), // Hash da senha
        role: UserRole.Student,
      });

      const user2 = this.userRepository.create({
        name: 'Professor',
        email: 'professor@teste.com',
        password: await bcrypt.hash('1234', 10), // Hash da senha
        role: UserRole.Teacher,
      });

      // Salva os usuários no banco de dados
      await this.userRepository.save([user1, user2]);

      this.logger.log('Usuários iniciais criados com sucesso!');
    } else {
      this.logger.log('Usuários já existem no banco de dados.');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`Usuário com email ${email} não encontrado.`);
    }
    return user ?? undefined;
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      this.logger.log(`Usuário ${email} validado com sucesso.`);
      return user;
    }

    this.logger.warn(`Credenciais inválidas para o usuário ${email}.`);
    return null; // Retorna null se as credenciais forem inválidas
  }

}

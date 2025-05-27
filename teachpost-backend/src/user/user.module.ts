import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserInitService } from './user-init.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Garanta que o repositório de User está sendo importado
  providers: [UserService, UserInitService],
  controllers: [UserController],
  exports: [UserService],  // Caso precise exportar o serviço para outro módulo
})
export class UserModule {}

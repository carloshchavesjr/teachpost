import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module'; // Importe o UserModule
import { JwtModule } from '@nestjs/jwt'; // Importe o JwtModule

@Module({
  imports: [UserModule, JwtModule.register({ secret: 'secretKey' })], // Configure o JWT com uma chave secreta
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

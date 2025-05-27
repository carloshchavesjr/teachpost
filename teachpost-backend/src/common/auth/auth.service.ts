import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para login
  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(email);
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
  
    const payload = { email: user.email, role: user.role, userId: user.id };
    const access_token = this.jwtService.sign(payload);
  
    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      };
    }
  };


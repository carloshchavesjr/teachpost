import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserInitService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService) {}

  async onApplicationBootstrap() {
    await this.userService.createInitialUsers();
  }
}

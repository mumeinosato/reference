import { Controller, Get, Param } from '@nestjs/common';
import { LoginService } from './login/login.service';

@Controller('user')
export class UserController {
  constructor(private readonly loginService: LoginService) {}

  @Get('/login/:user/:pass')
  async getLogin(
    @Param('user') user: string,
    @Param('pass') pass: string,
  ): Promise<boolean> {
    return this.loginService.Login(user, pass);
  }
}

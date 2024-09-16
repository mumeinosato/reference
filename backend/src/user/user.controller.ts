import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login/login.service';

@Controller('user')
export class UserController {
  constructor(private readonly loginService: LoginService) {}

  /*@Get('/login/:user/:pass')
  async getLogin(
    @Param('user') user: string,
    @Param('pass') pass: string,
  ): Promise<number> {
    return this.loginService.Login(user, pass);
  }

  @Get('/register/:user/:pass')
  async getRegister(
    @Param('user') user: string,
    @Param('pass') pass: string,
  ): Promise<number> {
    return this.loginService.setPassword(user, pass);
  }*/

  @Post('/login')
  async getLogin(
    @Body('user') user: string,
    @Body('pass') pass: string,
  ): Promise<number> {
    return this.loginService.Login(user, pass);
  }

  @Post('/register')
  async getRegister(
    @Body('user') user: string,
    @Body('pass') pass: string,
  ): Promise<number> {
    return this.loginService.setPassword(user, pass);
  }
}

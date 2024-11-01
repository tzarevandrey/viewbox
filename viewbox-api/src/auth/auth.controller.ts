import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Get('/login')
  async login() {
    var res = await this.authService.login();
    return res;
  }

}

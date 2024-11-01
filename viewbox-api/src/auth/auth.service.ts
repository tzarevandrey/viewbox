import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/core/enums/roles.enum';
import { User } from 'src/core/models/users.model';
import { AuthResponseDto } from './dto/auth.response.dto';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) { }

  async login(): Promise<AuthResponseDto> {
    const user: User = { login: 'knpp\\tsarev-an', name: 'Царев Андрей Николаевич', roles: [Role.Superuser], expired: null }
    const tkn = await this.jwtService.signAsync(user, { secret: process.env.PRIVATE_KEY || 'SECRET' })
    return { token: tkn, roles: [...user.roles], expired: user.expired }
  }

}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from "src/core/models/users.model";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const user = await this.jwtService.verifyAsync<User>(token, { secret: process.env.PRIVATE_KEY || 'SECRET' });
      return true;

    } catch (e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }
  }

}
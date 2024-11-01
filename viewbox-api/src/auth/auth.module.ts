import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ],
})
export class AuthModule { }

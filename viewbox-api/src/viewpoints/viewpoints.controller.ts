import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ViewpointsService } from './viewpoints.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('viewpoints')
export class ViewpointsController {

  constructor(private viewpointsService: ViewpointsService) { }

  @Get()
  async getAll() {
    // throw new HttpException([], HttpStatus.BAD_REQUEST)
    return await this.viewpointsService.getAll();
  }
}

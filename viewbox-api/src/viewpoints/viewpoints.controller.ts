import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ViewpointsService } from './viewpoints.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';

@UseGuards(JwtAuthGuard)
@Controller('viewpoints')
export class ViewpointsController {

  constructor(private viewpointsService: ViewpointsService) { }

  @Get()
  async getAll() {
    return await this.viewpointsService.getAll();
  }

  @Post()
  async add(@Body() dto: ViewpointCreateDto) {
    return await this.viewpointsService.addViewpoint(dto);
  }

}

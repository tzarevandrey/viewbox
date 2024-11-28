import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ViewpointsService } from './viewpoints.service';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';
import { ViewpointsUpdateDto } from './dto/viewpoints.update.dto';

@UseGuards(JwtAuthGuard)
@Controller('viewpoints')
export class ViewpointsController {

  constructor(private viewpointsService: ViewpointsService) { }

  @Get()
  async getAll() {
    return await this.viewpointsService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.viewpointsService.getOne(id);
  }

  @Post()
  async add(@Body() dto: ViewpointCreateDto) {
    return await this.viewpointsService.add(dto);
  }

  @Put()
  async update(@Body() dto: ViewpointsUpdateDto) {
    return await this.viewpointsService.update(dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.viewpointsService.delete(id);
  }

}

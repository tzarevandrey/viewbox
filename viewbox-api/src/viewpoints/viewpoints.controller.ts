import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ViewpointsService } from './viewpoints.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';
import { ViewpointUpdateDto } from './dto/viewpoints.update.dto';

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
    const res = await this.viewpointsService.addViewpoint(dto);
    return res;
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.viewpointsService.getOne(id);
  }

  @Put()
  async update(@Body() vp: ViewpointUpdateDto) {
    return await this.viewpointsService.update(vp);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.viewpointsService.delete(id);
  }

}

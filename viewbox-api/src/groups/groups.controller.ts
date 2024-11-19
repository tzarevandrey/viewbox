import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { GroupCreateDto } from './dto/groups.create.dto';
import { GroupUpdateDto } from './dto/groups.update.dto';

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {

  constructor(private groupsService: GroupsService) { }

  @Get()
  async getAll() {
    return await this.groupsService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.groupsService.getOne(id);
  }

  @Post()
  async add(dto: GroupCreateDto) {
    return await this.groupsService.add(dto);
  }

  @Put()
  async update(dto: GroupUpdateDto) {
    return await this.groupsService.update(dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.groupsService.delete(id);
  }

}

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { PlaylistsService } from './playlists.service';
import { PlaylistCreateDto } from './dto/playlists.create.dto';
import { PlaylistUpdateDto } from './dto/playlists.update.dto';

@UseGuards(JwtAuthGuard)
@Controller('playlists')
export class PlaylistsController {

  constructor(private playlistsService: PlaylistsService) { }

  @Get()
  async getAll() {
    return await this.playlistsService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.playlistsService.getOne(id);
  }

  @Post()
  async add(@Body() dto: PlaylistCreateDto) {
    return await this.playlistsService.add(dto);
  }

  @Put()
  async update(@Body() dto: PlaylistUpdateDto) {
    return await this.playlistsService.update(dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.playlistsService.delete(id);
  }

  @Get('/test/:name')
  async test(@Param('name') name: string) {
    return await this.playlistsService.test(name);
  }

}

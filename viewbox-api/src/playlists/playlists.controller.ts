import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { PlaylistsService } from './playlists.service';

@UseGuards(JwtAuthGuard)
@Controller('playlists')
export class PlaylistsController {

  constructor(private playlistsService: PlaylistsService) { }

  @Get()
  async getAll() {
    return await this.playlistsService.getAll();
  }

}

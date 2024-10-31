import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from './playlists.model';
import { PlaylistItem } from './playlists.items.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [PlaylistsService],
  controllers: [PlaylistsController],
  exports: [PlaylistsService],
  imports: [
    SequelizeModule.forFeature([
      Playlist,
      PlaylistItem
    ]),
    JwtModule
  ]
})
export class PlaylistsModule {}

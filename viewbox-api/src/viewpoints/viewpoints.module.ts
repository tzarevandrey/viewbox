import { Module } from '@nestjs/common';
import { ViewpointsController } from './viewpoints.controller';
// import { JwtModule } from '@nestjs/jwt';
import { ViewpointsService } from './viewpoints.service';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { AuthModule } from 'src/auth/auth.module';
import { JournalsModule } from 'src/journals/journals.module';
import { Playlist } from 'src/playlists/playlists.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ViewpointsController],
  providers: [ViewpointsService],
  imports: [
    AuthModule,
    PlaylistsModule,
    SequelizeModule.forFeature([
      Viewpoint,
      Playlist
    ]),
    JwtModule,
    JournalsModule
  ]
})
export class ViewpointsModule { }

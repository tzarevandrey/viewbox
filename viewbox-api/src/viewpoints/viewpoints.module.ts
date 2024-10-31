import { Module } from '@nestjs/common';
import { ViewpointsController } from './viewpoints.controller';
import { JwtModule } from '@nestjs/jwt';
import { ViewpointsService } from './viewpoints.service';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';

@Module({
  controllers: [ViewpointsController],
  providers: [ViewpointsService],
  imports: [
    JwtModule,
    PlaylistsModule,
    SequelizeModule.forFeature([
      Viewpoint
    ]),
    JwtModule
  ]
})
export class ViewpointsModule {}

import { Module } from '@nestjs/common';
import { ViewpointsController } from './viewpoints.controller';
// import { JwtModule } from '@nestjs/jwt';
import { ViewpointsService } from './viewpoints.service';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ViewpointsController],
  providers: [ViewpointsService],
  imports: [
    AuthModule,
    PlaylistsModule,
    SequelizeModule.forFeature([
      Viewpoint
    ]),
  ]
})
export class ViewpointsModule { }

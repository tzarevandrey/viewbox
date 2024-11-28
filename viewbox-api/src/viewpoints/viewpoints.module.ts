import { Module } from '@nestjs/common';
import { ViewpointsService } from './viewpoints.service';
import { ViewpointsController } from './viewpoints.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { ViewpointItem } from './viewpoints.items.model';
import { JwtModule } from '@nestjs/jwt';
import { JournalsModule } from 'src/journals/journals.module';

@Module({
  providers: [ViewpointsService],
  controllers: [ViewpointsController],
  exports: [ViewpointsService],
  imports: [
    SequelizeModule.forFeature([
      Viewpoint,
      ViewpointItem
    ]),
    JwtModule,
    JournalsModule
  ]
})
export class ViewpointsModule { }

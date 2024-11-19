import { Module } from '@nestjs/common';
import { ContentItemsService } from './content-items.service';
import { ContentItemsController } from './content-items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContentItem } from './content-items.model';
import { ImageItem } from './image-items.model';
import { VideoItem } from './video-items.model';
import { WebpageItem } from './webpage-items.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';
import { JournalsModule } from 'src/journals/journals.module';

@Module({
  providers: [ContentItemsService],
  controllers: [ContentItemsController],
  imports: [
    SequelizeModule.forFeature([
      ContentItem,
      ImageItem,
      VideoItem,
      WebpageItem,
    ]),
    JwtModule,
    FilesModule,
    JournalsModule
  ]
})
export class ContentItemsModule { }

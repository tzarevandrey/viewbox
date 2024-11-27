import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ContentItemsModule } from './content-items/content-items.module';
import { JournalsModule } from './journals/journals.module';
import { FilesModule } from './files/files.module';
import { ContentItem } from './content-items/content-items.model';
import { ImageItem } from './content-items/image-items.model';
import { VideoItem } from './content-items/video-items.model';
import { WebpageItem } from './content-items/webpage-items.model';
import { Journal } from './journals/journals.model';
import { JournalDetail } from './journals/journals.details.model';
import { Playlist } from './playlists/playlists.model';
import { PlaylistItem } from './playlists/playlists.items.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GroupsModule } from './groups/groups.module';
import * as path from 'path';
import { Group } from './groups/groups.model';
import { GroupRole } from './groups/groups.roles.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.MODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        ContentItem,
        ImageItem,
        VideoItem,
        WebpageItem,
        Journal,
        JournalDetail,
        Playlist,
        PlaylistItem,
        Group,
        GroupRole,
      ],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('D://', process.env.FILES_STORAGE || 'files_storage')
    }),
    AuthModule,
    PlaylistsModule,
    ContentItemsModule,
    JournalsModule,
    FilesModule,
    GroupsModule,
  ],
})
export class AppModule { }

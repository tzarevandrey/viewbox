import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContentItem } from './content-items.model';
import { ImageItem } from './image-items.model';
import { VideoItem } from './video-items.model';
import { WebpageItem } from './webpage-items.model';
import { ContentItemCreateDto } from './dto/content-items.create.dto';
import { FilesService } from 'src/files/files.service';
import { ContentType } from 'src/core/enums/content-types.enum';
import { ContentUpdateDto } from './dto/content-items.update.dto';
import { JournalsService } from 'src/journals/journals.service';
import { EventEntity } from 'src/core/enums/event-entities.enum';
import { EventType } from 'src/core/enums/event-types.enum';
import { Playlist } from 'src/playlists/playlists.model';
import { PlaylistItem } from 'src/playlists/playlists.items.model';

@Injectable()
export class ContentItemsService {

  constructor(
    @InjectModel(ContentItem) private contentRepository: typeof ContentItem,
    @InjectModel(ImageItem) private iamgeRepository: typeof ImageItem,
    @InjectModel(VideoItem) private videoRepository: typeof VideoItem,
    @InjectModel(WebpageItem) private webpageRepository: typeof WebpageItem,
    @InjectModel(Playlist) private playlistRepository: typeof Playlist,
    private filesService: FilesService,
    private journalService: JournalsService
  ) { }

  async getAll() {
    return await this.contentRepository.findAll({
      include: [{ model: ImageItem }, { model: VideoItem }, { model: WebpageItem }]
    });
  }

  async getOne(id: number) {
    const content = await this.contentRepository.findByPk(id, {
      include: [{ model: ImageItem }, { model: VideoItem }, { model: WebpageItem }]
    })
    if (!content) return new HttpException(`Контент ${id} не найден`, HttpStatus.BAD_REQUEST);
    const playlists = await this.playlistRepository.findAll({ include: [{ model: PlaylistItem, required: true, where: [{ contentItemId: id }] }] });
    return { ...content.dataValues, playlists: playlists.map(x => ({ id: x.id, name: x.name })) };
  }

  async addContent(dto: ContentItemCreateDto, file?: Express.Multer.File) {
    let name = dto.name;
    if ([ContentType.Picture, ContentType.Video].includes(Number(dto.contentType))) {
      name = await this.filesService.saveFile(file);
    }
    const content = await this.contentRepository.create({ contentType: dto.contentType, name, description: dto.description, lastUpdated: new Date() });
    switch (Number(dto.contentType)) {
      case ContentType.Picture:
        await this.iamgeRepository.create({
          originalName: file.originalname,
          contentItemId: content.id
        });
        try {
          this.journalService.addRecord({
            eventEntity: EventEntity.ContentItem,
            eventType: EventType.Create,
            entityName: file.originalname,
            entityActual: { ...content.dataValues, originalName: file.originalname }
          });
        } catch { }
        break;
      case ContentType.Video:
        await this.videoRepository.create({
          originalName: file.originalname,
          contentItemId: content.id
        });
        try {
          this.journalService.addRecord({
            eventEntity: EventEntity.ContentItem,
            eventType: EventType.Create,
            entityName: file.originalname,
            entityActual: { ...content.dataValues, originalName: file.originalname }
          });
        } catch { }
        break;
      case ContentType.WebPage:
        await this.webpageRepository.create({
          contentItemId: content.id
        });
        try {
          this.journalService.addRecord({
            eventEntity: EventEntity.ContentItem,
            eventType: EventType.Create,
            entityName: content.name,
            entityActual: { ...content.dataValues }
          });
        } catch { }
        break;
    }
    return content;
  }

  async deleteContent(id: number) {
    try {
      const content = await this.contentRepository.findByPk(id, { include: [{ model: ImageItem }, { model: VideoItem }, { model: WebpageItem }] });
      if (!content) return HttpStatus.BAD_REQUEST;
      const old = { ...content.dataValues }
      let name = old.name;
      switch (content.contentType) {
        case ContentType.Picture:
          await this.filesService.deleteFile(content.name);
          name = content.imageItem.originalName;
          await this.iamgeRepository.destroy({ where: { contentItemId: id } });
          break;
        case ContentType.Video:
          await this.filesService.deleteFile(content.name);
          name = content.videoItem.originalName;
          await this.videoRepository.destroy({ where: { contentItemId: id } });
          break;
        case ContentType.WebPage:
          await this.webpageRepository.destroy({ where: { contentItemId: id } });
          break;
      }
      await content.destroy();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.ContentItem,
          eventType: EventType.Delete,
          entityName: name,
          entityOld: { ...old }
        })
      } catch { }
      return HttpStatus.OK;
    } catch {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async updateContent(cont: ContentUpdateDto) {
    const content = await this.contentRepository.findByPk(cont.id, { include: [{ model: ImageItem }, { model: VideoItem }] });
    if (content === null) throw new HttpException(`Контент ${cont.id} не найден`, HttpStatus.BAD_REQUEST);
    const old = { ...content.dataValues };
    content.name = cont.name;
    content.description = cont.description;
    content.lastUpdated = new Date();
    const actual = await content.save({ returning: true });
    let name = cont.name;
    switch (content.contentType) {
      case ContentType.Picture: name = content.imageItem.originalName;
        break;
      case ContentType.Video: name = content.videoItem.originalName;
        break;
    }
    try {
      this.journalService.addRecord({
        eventEntity: EventEntity.ContentItem,
        eventType: EventType.Update,
        entityName: name,
        entityActual: { ...actual.dataValues },
        entityOld: { ...old }
      })
    } catch { }
    return actual;
  }

}

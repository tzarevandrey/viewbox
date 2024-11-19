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

@Injectable()
export class ContentItemsService {

  constructor(
    @InjectModel(ContentItem) private contentRepository: typeof ContentItem,
    @InjectModel(ImageItem) private iamgeRepository: typeof ImageItem,
    @InjectModel(VideoItem) private videoRepository: typeof VideoItem,
    @InjectModel(WebpageItem) private webpageRepository: typeof WebpageItem,
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
      include: [{ all: true }]
    })
    if (!content) throw new HttpException(`Контент ${id} не найден`, HttpStatus.BAD_REQUEST);
    return content;
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
        this.journalService.addRecord({
          eventEntity: EventEntity.ContentItem,
          eventType: EventType.Create,
          entityName: file.originalname,
          entityActual: { ...content.dataValues, originalName: file.originalname }
        });
        break;
      case ContentType.Video:
        await this.videoRepository.create({
          originalName: file.originalname,
          contentItemId: content.id
        });
        this.journalService.addRecord({
          eventEntity: EventEntity.ContentItem,
          eventType: EventType.Create,
          entityName: file.originalname,
          entityActual: { ...content.dataValues, originalName: file.originalname }
        });
        break;
      case ContentType.WebPage:
        await this.webpageRepository.create({
          contentItemId: content.id
        });
        this.journalService.addRecord({
          eventEntity: EventEntity.ContentItem,
          eventType: EventType.Create,
          entityName: content.name,
          entityActual: content.dataValues
        });
        break;
    }
    return content;
  }

  async deleteContent(id: number) {
    try {
      const content = await this.contentRepository.findByPk(id, { include: [{ model: ImageItem }, { model: VideoItem }, { model: WebpageItem }] });
      let name = content.name;
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
      this.journalService.addRecord({
        eventEntity: EventEntity.ContentItem,
        eventType: EventType.Delete,
        entityName: name
      })
    } catch {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async updateContent(cont: ContentUpdateDto) {
    const content = await this.contentRepository.findByPk(cont.id, { include: [{ model: ImageItem }, { model: VideoItem }] });
    if (!content) throw new HttpException(`Контент ${cont.id} не найден`, HttpStatus.BAD_REQUEST);
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
    this.journalService.addRecord({
      eventEntity: EventEntity.ContentItem,
      eventType: EventType.Update,
      entityName: name,
      entityActual: actual.dataValues,
      entityOld: old
    })
    return actual;
  }

}

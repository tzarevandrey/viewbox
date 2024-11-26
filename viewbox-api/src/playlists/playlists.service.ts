import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './playlists.model';
import { PlaylistCreateDto } from './dto/playlists.create.dto';
import { PlaylistItem } from './playlists.items.model';
import { PlaylistUpdateDto } from './dto/playlists.update.dto';
import { JournalsService } from 'src/journals/journals.service';
import { EventEntity } from 'src/core/enums/event-entities.enum';
import { EventType } from 'src/core/enums/event-types.enum';
import { ContentItem } from 'src/content-items/content-items.model';
import { ImageItem } from 'src/content-items/image-items.model';
import { VideoItem } from 'src/content-items/video-items.model';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectModel(Playlist) private playlistsRepository: typeof Playlist,
    @InjectModel(PlaylistItem) private playlistsItemsRepository: typeof PlaylistItem,
    private journalService: JournalsService
  ) { }

  async getOne(id: number) {
    const playlist = await this.playlistsRepository.findByPk(id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
    return playlist;
  }

  async add(dto: PlaylistCreateDto) {
    const playlist = await this.playlistsRepository.create({ name: dto.name, description: dto.description });
    this.journalService.addRecord({
      eventEntity: EventEntity.Playlist,
      eventType: EventType.Create,
      entityName: playlist.name,
      entityActual: { ...playlist.dataValues }
    });
    for (const plItem of dto.items) {
      const playlistItem = await this.playlistsItemsRepository.create({
        ...plItem,
        playlistId: playlist.id
      });
      this.journalService.addRecord({
        eventEntity: EventEntity.PlaylistItem,
        eventType: EventType.Link,
        entityName: playlist.name,
        entityActual: { ...playlistItem.dataValues }
      });
    }
    return await this.playlistsRepository.findByPk(playlist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

  async getAll() {
    return await this.playlistsRepository.findAll({ include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

  async update(dto: PlaylistUpdateDto) {
    const playlist = await this.playlistsRepository.findByPk(dto.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
    if (playlist === undefined) return HttpStatus.BAD_REQUEST;
    const old = { ...playlist.dataValues };
    if (playlist.name !== dto.name || playlist.description !== dto.description) {
      playlist.name = dto.name;
      playlist.description = dto.description ?? null;
      const actual = await playlist.save();
      this.journalService.addRecord({
        eventEntity: EventEntity.Playlist,
        eventType: EventType.Update,
        entityName: playlist.name,
        entityActual: { ...actual.dataValues },
        entityOld: { ...old }
      });
    }
    const actual = await this.playlistsRepository.findByPk(playlist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
    const deletedItems = actual.items.filter(x => !dto.items.map(y => y.contentItemId).includes(x.contentItemId));
    for (const item of deletedItems) {
      const delItem = { ...item.dataValues };
      await item.destroy();
      this.journalService.addRecord({
        eventEntity: EventEntity.PlaylistItem,
        eventType: EventType.Unlink,
        entityName: actual.name,
        entityOld: { ...delItem }
      })
    }
    for (const item of dto.items) {
      const aItem = actual.items.find(x => x.position === item.position);
      if (aItem !== undefined) {
        if (item.duration !== aItem.duration || item.expireDate !== aItem.expireDate || item.position !== aItem.position || item.startDate !== aItem.startDate) {
          const oldItem = { ...aItem.dataValues };
          aItem.duration = item.duration;
          aItem.expireDate = item.expireDate;
          aItem.position = item.position;
          aItem.startDate = item.startDate;
          const actualItem = await aItem.save();
          this.journalService.addRecord({
            eventEntity: EventEntity.PlaylistItem,
            eventType: EventType.Update,
            entityName: actual.name,
            entityActual: { ...actualItem.dataValues },
            entityOld: { ...oldItem }
          });
        }
      } else {
        const actualItem = await this.playlistsItemsRepository.create({
          ...item,
          playlistId: actual.id
        });
        this.journalService.addRecord({
          eventEntity: EventEntity.Playlist,
          eventType: EventType.Link,
          entityName: actual.name,
          entityActual: { ...actualItem.dataValues }
        });
      }
    }
    return await this.playlistsRepository.findByPk(playlist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

  async delete(id: number) {
    try {
      const playlist = await this.playlistsRepository.findByPk(id);
      if (!playlist) return HttpStatus.BAD_REQUEST;
      const old = { ...playlist.dataValues };
      await playlist.destroy();
      this.journalService.addRecord({
        eventEntity: EventEntity.Playlist,
        eventType: EventType.Delete,
        entityName: old.name,
        entityOld: { ...old }
      });
      return HttpStatus.OK;
    } catch {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

}

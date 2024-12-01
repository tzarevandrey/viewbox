import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { Viewpoint } from 'src/viewpoints/viewpoints.model';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectModel(Playlist) private playlistsRepository: typeof Playlist,
    @InjectModel(PlaylistItem) private playlistsItemsRepository: typeof PlaylistItem,
    private journalService: JournalsService
  ) { }

  async getOne(id: number) {
    const playlist = await this.playlistsRepository.findByPk(id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }, { model: Viewpoint }] });
    return playlist;
  }

  async add(dto: PlaylistCreateDto) {
    const playlist = await this.playlistsRepository.create({ name: dto.name, description: dto.description });
    try {
      this.journalService.addRecord({
        eventEntity: EventEntity.Playlist,
        eventType: EventType.Create,
        entityName: playlist.name,
        entityActual: { ...playlist.dataValues }
      });
    } catch { }
    for (const plItem of dto.items) {
      const playlistItem = await this.playlistsItemsRepository.create({
        ...plItem,
        playlistId: playlist.id
      });
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.PlaylistItem,
          eventType: EventType.Link,
          entityName: playlist.name,
          entityActual: { ...playlistItem.dataValues }
        });
      } catch { }
    }
    return await this.playlistsRepository.findByPk(playlist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

  async getAll() {
    return await this.playlistsRepository.findAll({ include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

  async update(dto: PlaylistUpdateDto) {
    const playlist = await this.playlistsRepository.findByPk(dto.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
    if (playlist === null) return new HttpException('Список воспроизведения не найден', HttpStatus.BAD_REQUEST);
    const old = { ...playlist.dataValues };
    if (playlist.name !== dto.name || playlist.description !== dto.description) {
      playlist.name = dto.name;
      playlist.description = dto.description ?? null;
      const actual = await playlist.save();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.Playlist,
          eventType: EventType.Update,
          entityName: playlist.name,
          entityActual: { ...actual.dataValues },
          entityOld: { ...old }
        });
      } catch { }
    }
    const actual = await this.playlistsRepository.findByPk(playlist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
    const deletedItems = actual.items.filter(x => !dto.items.map(y => y.contentItemId).includes(x.contentItemId));
    for (const item of deletedItems) {
      const delItem = { ...item.dataValues };
      await item.destroy();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.PlaylistItem,
          eventType: EventType.Unlink,
          entityName: actual.name,
          entityOld: { ...delItem }
        })
      } catch { }
    }
    for (const item of dto.items) {
      const aItem = actual.items.find(x => x.position === item.position);
      if (aItem !== null) {
        if (item.duration !== aItem.duration || item.expireDate !== aItem.expireDate || item.position !== aItem.position || item.startDate !== aItem.startDate) {
          const oldItem = { ...aItem.dataValues };
          aItem.duration = item.duration;
          aItem.expireDate = item.expireDate;
          aItem.position = item.position;
          aItem.startDate = item.startDate;
          const actualItem = await aItem.save();
          try {
            this.journalService.addRecord({
              eventEntity: EventEntity.PlaylistItem,
              eventType: EventType.Update,
              entityName: actual.name,
              entityActual: { ...actualItem.dataValues },
              entityOld: { ...oldItem }
            });
          } catch { }
        }
      } else {
        const actualItem = await this.playlistsItemsRepository.create({
          ...item,
          playlistId: actual.id
        });
        try {
          this.journalService.addRecord({
            eventEntity: EventEntity.PlaylistItem,
            eventType: EventType.Link,
            entityName: actual.name,
            entityActual: { ...actualItem.dataValues }
          });
        } catch { }
      }
    }
    return await this.playlistsRepository.findByPk(playlist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

  async delete(id: number) {
    try {
      const playlist = await this.playlistsRepository.findByPk(id, { include: [{ model: PlaylistItem }] });
      if (!playlist) return HttpStatus.BAD_REQUEST;
      const old = { ...playlist.dataValues };
      for (const item of playlist.items) {
        await item.destroy();
      }
      await playlist.destroy();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.Playlist,
          eventType: EventType.Delete,
          entityName: old.name,
          entityOld: { ...old }
        });
      } catch { }
      return HttpStatus.OK;
    } catch {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async test(name: string) {
    const res = await this.playlistsRepository.findOne({ where: [{ name }] });
    if (res === null) return true;
    return false;
  }

  async copy(id: number) {
    const playlist = await this.playlistsRepository.findByPk(id, {include: [{model: PlaylistItem}]});
    const currentDate = new Date();
    const name = `${playlist.name}_копия_${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}_${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const newPlaylist = await this.playlistsRepository.create({ name, description: playlist.description });
    try {
      this.journalService.addRecord({
        eventEntity: EventEntity.Playlist,
        eventType: EventType.Create,
        entityName: newPlaylist.name,
        entityActual: { ...newPlaylist.dataValues }
      });
    } catch {}
    for (const item of playlist.items) {
      const playlistItem = await this.playlistsItemsRepository.create({ ...item.dataValues, playlistId: newPlaylist.id });
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.PlaylistItem,
          eventType: EventType.Link,
          entityName: newPlaylist.name,
          entityActual: { ...playlistItem.dataValues }
        });
      } catch {}
    }
    return await this.playlistsRepository.findByPk(newPlaylist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

}

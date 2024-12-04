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
import { ViewpointItem } from 'src/viewpoints/viewpoints.items.model';
import { Op } from 'sequelize';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectModel(Playlist) private playlistsRepository: typeof Playlist,
    @InjectModel(PlaylistItem) private playlistsItemsRepository: typeof PlaylistItem,
    @InjectModel(Viewpoint) private viewpointRepository: typeof Viewpoint,
    private journalService: JournalsService
  ) { }

  async getOne(id: number) {
    const playlist = await this.playlistsRepository.findByPk(id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
    if (!playlist) return new HttpException(`Список воспроизведения ${id} не найден`, HttpStatus.BAD_REQUEST);
    const viewpoints = await this.viewpointRepository.findAll({ include: [{ model: ViewpointItem, required: true, where: [{ playlistId: id }] }] });
    return { ...playlist.dataValues, viewpoints: viewpoints.map(x => ({ id: x.id, name: x.name })) };
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
      if (aItem !== undefined) {
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
    const playlist = await this.playlistsRepository.findByPk(id, { include: [{ model: PlaylistItem }] });
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
    } catch { }
    for (const item of playlist.items) {
      let temp = { ...item.dataValues };
      delete temp['id'];
      const playlistItem = await this.playlistsItemsRepository.create({ ...temp, playlistId: newPlaylist.id });
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.PlaylistItem,
          eventType: EventType.Link,
          entityName: newPlaylist.name,
          entityActual: { ...playlistItem.dataValues }
        });
      } catch { }
    }
    return await this.playlistsRepository.findByPk(newPlaylist.id, { include: [{ model: PlaylistItem, include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }] }] });
  }

  async play(id: number) {
    const currentDate = new Date();
    const playlist = await this.playlistsRepository.findByPk(id, {
      include: [{
        model: PlaylistItem, where: [{
          [Op.and]: [
            {
              startDate: {
                [Op.or]: [
                  { [Op.eq]: null },
                  { [Op.lte]: currentDate }
                ]
              }
            },
            {
              expireDate: {
                [Op.or]: [
                  { [Op.eq]: null },
                  { [Op.gte]: currentDate }
                ]
              }
            }
          ]
        }], include: [{ model: ContentItem, include: [{ model: ImageItem }, { model: VideoItem }] }]
      }]
    })
    return playlist.items;
  }

}

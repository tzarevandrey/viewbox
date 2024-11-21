import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './playlists.model';
import { PlaylistCreateDto } from './dto/playlists.create.dto';
import { PlaylistItem } from './playlists.items.model';
import { PlaylistUpdateDto } from './dto/playlists.update.dto';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectModel(Playlist) private playlistsRepository: typeof Playlist,
    @InjectModel(PlaylistItem) private playlistsItemsRepository: typeof PlaylistItem,
  ) { }

  async getOne(id: number) {
    const playlist = await this.playlistsRepository.findByPk(id, { include: [{ all: true }] });
    return playlist;
  }

  async add(dto: PlaylistCreateDto) {
    const playlist = await this.playlistsRepository.create({ name: dto.name, description: dto.description });
    if (dto.items?.length > 0) {
      await playlist.$set('items', [...dto.items]);//неверно
    }
    return playlist;
  }

  async getAll() {
    // return [
    //     {id: 3, name: 'third-plist', description: 'Третий тестовый плейлист'},
    //     {id: 2, name: 'second-plist', description: 'Второй тестовый плейлист'},
    //     {id: 1, name: 'first-plist', description: 'Первый тестовый плейлист'}
    // ]
    return await this.playlistsRepository.findAll();
  }

  async update(dto: PlaylistUpdateDto) {

  }

  async delete(id: number) {

  }

}

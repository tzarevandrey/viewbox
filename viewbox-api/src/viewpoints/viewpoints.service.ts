import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { ViewpointItem } from './viewpoints.items.model';
import { JournalsService } from 'src/journals/journals.service';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';
import { ViewpointsUpdateDto } from './dto/viewpoints.update.dto';
import { Playlist } from 'src/playlists/playlists.model';

@Injectable()
export class ViewpointsService {

  constructor(
    @InjectModel(Viewpoint) private viewpointsRepository: typeof Viewpoint,
    @InjectModel(ViewpointItem) private viewpointsItemsRepository: typeof ViewpointItem,
    private journalService: JournalsService
  ) { }

  async getAll() {
    try {
      const viewpoints = await this.viewpointsRepository.findAll();
      return viewpoints;
    } catch {
      return new HttpException('Ошибка при получении панелей воспроизведения', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOne(id: number) {
    try {
      const viewpoint = await this.viewpointsRepository.findByPk(id, { include: [{ model: ViewpointItem, include: [{ model: Playlist, attributes: ['id', 'name'] }] }] });
      if (!viewpoint) return new HttpException(`Не найдена панель воспроизведения id=${id}`, HttpStatus.BAD_REQUEST);
      return viewpoint;
    } catch {
      throw new HttpException(`Ошибка при получении панели воспроизведения id=${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async add(dto: ViewpointCreateDto) {

  }

  async update(dto: ViewpointsUpdateDto) {

  }

  async delete(id: number) {

  }
}

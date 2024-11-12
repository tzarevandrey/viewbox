import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';
import { JournalsService } from 'src/journals/journals.service';
import { Playlist } from 'src/playlists/playlists.model';
import { ViewpointUpdateDto } from './dto/viewpoints.update.dto';
import { EventEntity } from 'src/core/enums/event-entities.enum';
import { EventType } from 'src/core/enums/event-types.enum';

@Injectable()
export class ViewpointsService {

  constructor(
    @InjectModel(Viewpoint) private viewpointRepository: typeof Viewpoint,
    private journalService: JournalsService
  ) { }

  async addViewpoint(dto: ViewpointCreateDto) {
    const viewpoint = await this.viewpointRepository.create(dto);
    this.journalService.addRecord({
      eventEntity: EventEntity.Viewpoint,
      eventType: EventType.Create,
      entityName: viewpoint.name,
      entity: viewpoint
    })
    return viewpoint;
  }

  async getAll() {
    const viewpoints = await this.viewpointRepository.findAll();
    return viewpoints;
  }

  async getOne(id: number) {
    const viewpoint = await this.viewpointRepository.findByPk(id, { include: [{ model: Playlist }] });
    if (!viewpoint) throw new HttpException('Панель воспроизведения не найдена', HttpStatus.BAD_REQUEST);
    return viewpoint;
  }

  async update(vp: ViewpointUpdateDto) {
    await this.viewpointRepository.update(vp, { where: { id: vp.id } });
    return;
  }

  async delete(id: number) {
    await this.viewpointRepository.destroy({ where: { id: id } });
    return;
  }

}

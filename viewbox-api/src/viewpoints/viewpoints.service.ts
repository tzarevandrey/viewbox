import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';
import { JournalsService } from 'src/journals/journals.service';
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
      entityActual: { ...viewpoint.dataValues }
    })
    return viewpoint;
  }

  async getAll() {
    const viewpoints = await this.viewpointRepository.findAll();
    return viewpoints;
  }

  async getOne(id: number) {
    const viewpoint = await this.viewpointRepository.findByPk(id, { include: [{ all: true }] });
    if (!viewpoint) throw new HttpException(`Панель воспроизведения ${id} не найдена`, HttpStatus.BAD_REQUEST);
    return viewpoint;
  }

  async update(vp: ViewpointUpdateDto) {
    const viewpoint = await this.viewpointRepository.findByPk(vp.id);
    if (!viewpoint) throw new HttpException(`Панель воспроизведения ${vp.id} не найдена`, HttpStatus.BAD_REQUEST);
    const old = { ...viewpoint.dataValues };
    viewpoint.name = vp.name;
    viewpoint.description = vp.description;
    viewpoint.playlistId = vp.playlistId;
    const actual = await viewpoint.save();
    this.journalService.addRecord({
      eventEntity: EventEntity.Viewpoint,
      eventType: EventType.Update,
      entityName: vp.name,
      entityActual: { ...actual.dataValues },
      entityOld: { ...old }
    })
    return actual;
  }

  async delete(id: number) {
    try {
      const viewpoint = await this.viewpointRepository.findByPk(id);
      if (!viewpoint) return HttpStatus.BAD_REQUEST;
      const old = { ...viewpoint.dataValues }
      await viewpoint.destroy();
      this.journalService.addRecord({
        eventEntity: EventEntity.Viewpoint,
        eventType: EventType.Delete,
        entityName: old.name,
        entityOld: { ...old }
      })
      return HttpStatus.OK;
    } catch {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

}

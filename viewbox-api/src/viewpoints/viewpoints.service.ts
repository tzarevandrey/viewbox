import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { ViewpointItem } from './viewpoints.items.model';
import { JournalsService } from 'src/journals/journals.service';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';
import { ViewpointsUpdateDto } from './dto/viewpoints.update.dto';
import { Playlist } from 'src/playlists/playlists.model';
import { EventEntity } from 'src/core/enums/event-entities.enum';
import { EventType } from 'src/core/enums/event-types.enum';

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
    const viewpoint = await this.viewpointsRepository.create({ name: dto.name, description: dto.description });
    try {
      this.journalService.addRecord({
        eventEntity: EventEntity.Viewpoint,
        eventType: EventType.Create,
        entityName: viewpoint.name,
        entityActual: { ...viewpoint.dataValues }
      });
    } catch { }
    for (const item of dto.items) {
      const viewpointItem = await this.viewpointsItemsRepository.create({ ...item, viewpointId: viewpoint.id });
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.ViewpointItem,
          eventType: EventType.Link,
          entityName: viewpoint.name,
          entityActual: { ...viewpointItem.dataValues }
        });
      } catch { }
    }
    return await this.getOne(viewpoint.id);
  }

  async update(dto: ViewpointsUpdateDto) {
    const viewpoint = await this.viewpointsRepository.findByPk(dto.id, { include: [{ model: ViewpointItem }] });
    if (viewpoint === undefined) return new HttpException('Панель воспроизведения не найдена', HttpStatus.BAD_REQUEST);
    const old = { ...viewpoint.dataValues };
    if (old.name !== dto.name || old.description !== dto.description) {
      viewpoint.name = dto.name;
      viewpoint.description = dto.description;
      const actual = await viewpoint.save();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.Viewpoint,
          eventType: EventType.Update,
          entityName: viewpoint.name,
          entityActual: { ...actual.dataValues },
          entityOld: { ...old }
        });
      } catch { }
    }
    const actual = await this.viewpointsRepository.findByPk(dto.id, { include: [{ model: ViewpointItem }] });
    const deletedItems = actual.items.filter(x => !dto.items.map(y => y.id).includes(x.id));
    for (const item of deletedItems) {
      const delItem = { ...item.dataValues };
      await item.destroy();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.ViewpointItem,
          eventType: EventType.Unlink,
          entityName: actual.name,
          entityOld: { ...delItem }
        })
      } catch { }
    }
    for (const item of dto.items) {
      if (item.id === undefined || item.id === null || item.id < 1) {
        let tempItem = { ...item };
        delete tempItem.id;
        const actualItem = await this.viewpointsItemsRepository.create({ ...tempItem, viewpointId: actual.id });
        try {
          this.journalService.addRecord({
            eventEntity: EventEntity.ViewpointItem,
            eventType: EventType.Link,
            entityName: actual.name,
            entityActual: { ...actualItem.dataValues }
          });
        } catch { }
      } else {
        const viewpointItem = await this.viewpointsItemsRepository.findByPk(item.id);
        if (viewpointItem !== undefined) {
          const oldItem = { ...viewpointItem.dataValues };
          if (oldItem.playlistId !== item.playlistId || oldItem.startDate !== item.startDate || oldItem.expireDate !== item.expireDate || oldItem.isDefault !== item.isDefault) {
            viewpointItem.playlistId = item.playlistId;
            viewpointItem.startDate = item.startDate;
            viewpointItem.expireDate = item.expireDate;
            viewpointItem.isDefault = item.isDefault;
            const actualItem = await viewpointItem.save();
            try {
              this.journalService.addRecord({
                eventEntity: EventEntity.ViewpointItem,
                eventType: EventType.Update,
                entityName: actual.name,
                entityActual: { ...actualItem.dataValues },
                entityOld: { ...oldItem }
              });
            } catch { }
          }
        }
      }
    }
    return await this.viewpointsRepository.findByPk(dto.id, { include: [{ model: ViewpointItem, include: [{ model: Playlist, attributes: ['id', 'name'] }] }] });
  }

  async delete(id: number) {

  }

  async test(name: string) {
    const res = await this.viewpointsRepository.findOne({ where: [{ name }] });
    if (res === undefined) return true;
    return false;
  }

}

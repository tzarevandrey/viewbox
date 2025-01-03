import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { JournalsService } from 'src/journals/journals.service';
import { GroupRole } from './groups.roles.model';
import { GroupCreateDto } from './dto/groups.create.dto';
import { GroupUpdateDto } from './dto/groups.update.dto';
import { EventEntity } from 'src/core/enums/event-entities.enum';
import { EventType } from 'src/core/enums/event-types.enum';

@Injectable()
export class GroupsService {

  constructor(
    @InjectModel(Group) private groupsRepository: typeof Group,
    @InjectModel(GroupRole) private groupsRolesRepository: typeof GroupRole,
    private journalService: JournalsService
  ) { }

  async add(dto: GroupCreateDto) {
    const group = await this.groupsRepository.create(dto);
    try {
      this.journalService.addRecord({
        eventEntity: EventEntity.Group,
        eventType: EventType.Create,
        entityName: group.name,
        entityActual: { ...group.dataValues }
      });
    } catch { }
    for (const role of dto.roles) {
      const groupRole = await this.groupsRolesRepository.create({ groupId: group.id, role });
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.GroupRole,
          eventType: EventType.Link,
          entityName: group.name,
          entityActual: { ...groupRole.dataValues }
        });
      } catch { }
    }
    return await group.reload({ include: [{ model: GroupRole }] });
  }

  async getAll() {
    return await this.groupsRepository.findAll({ include: [{ model: GroupRole }] });
  }

  async getOne(id: number) {
    const group = await this.groupsRepository.findByPk(id, { include: [{ model: GroupRole }] });
    if (!group) throw new HttpException(`Группа ${id} не найдена`, HttpStatus.BAD_REQUEST);
    return group;
  }

  async update(dto: GroupUpdateDto) {
    const group = await this.groupsRepository.findByPk(dto.id, { include: [{ model: GroupRole }] });
    if (group === null) throw new HttpException(`Группа ${dto.id} не найдена`, HttpStatus.BAD_REQUEST);
    const old = { ...group.dataValues };
    if (group.name !== dto.name || (group.description ?? null) !== (dto.description ?? null)) {
      group.name = dto.name;
      group.description = dto.description ?? null;
      const actual = await group.save();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.Group,
          eventType: EventType.Update,
          entityName: group.name,
          entityActual: { ...actual.dataValues },
          entityOld: { ...old }
        })
      } catch { }
    };
    const actual = await group.reload({ include: [{ model: GroupRole }] });
    const deletedRoles = actual.roles.filter(x => !dto.roles.includes(x.role));
    for (const role of deletedRoles) {
      const oldRole = { ...role };
      await role.destroy();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.GroupRole,
          eventType: EventType.Unlink,
          entityName: actual.name,
          entityOld: { ...oldRole }
        })
      } catch { }
    }
    const addedRoles = dto.roles.filter(x => !actual.roles.map(y => y.role).includes(x));
    for (const role of addedRoles) {
      const newRole = await this.groupsRolesRepository.create({ groupId: actual.id, role });
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.GroupRole,
          eventType: EventType.Link,
          entityName: actual.name,
          entityActual: { ...newRole }
        })
      } catch { }
    }
    return await actual.reload({ include: [{ model: GroupRole }] });
  }

  async delete(id: number) {
    try {
      const group = await this.groupsRepository.findByPk(id);
      if (!group) return HttpStatus.BAD_REQUEST;
      const old = { ...group.dataValues };
      await group.destroy();
      try {
        this.journalService.addRecord({
          eventEntity: EventEntity.Group,
          eventType: EventType.Delete,
          entityName: old.name,
          entityOld: { ...old }
        })
      } catch { }
      return HttpStatus.OK;
    } catch {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async test(name: string) {
    const res = await this.groupsRepository.findOne({ where: [{ name }] });
    if (res === null) return true;
    return false;
  }

}

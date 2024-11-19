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
    this.journalService.addRecord({
      eventEntity: EventEntity.Group,
      eventType: EventType.Create,
      entityName: group.name,
      entityActual: group.dataValues
    });
    dto.roles.forEach(async (role) => {
      const groupRole = await this.groupsRolesRepository.create({ groupId: group.id, role });
      this.journalService.addRecord({
        eventEntity: EventEntity.GroupRole,
        eventType: EventType.Link,
        entityName: group.name,
        entityActual: groupRole.dataValues
      });
    })
    return await this.groupsRepository.findByPk(group.id, { include: [{ model: GroupRole }] });
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
    if (!group) throw new HttpException(`Группа ${dto.id} не найдена`, HttpStatus.BAD_REQUEST);
    const old = { ...group, roles: [...group.roles] };
    if ()
  }

}

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journals.model';
import { JournalDetail } from './journals.details.model';
import { REQUEST } from '@nestjs/core';
import { User } from 'src/core/models/users.model';
import { JournalCreateDto } from './dto/journals.create.dto';
import { EventType } from 'src/core/enums/event-types.enum';
import { ENTITIES_FIELDS_KEYS } from 'src/core/dictionaries/entities-fields.keys.dict';
import { JournalPageGetDto } from './dto/journals.get.page.dto';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class JournalsService {

  constructor(
    @InjectModel(Journal) private journalsRepository: typeof Journal,
    @InjectModel(JournalDetail) private journalDetailRepository: typeof JournalDetail,
    @Inject(REQUEST) private request
  ) { }

  async addRecord(dto: JournalCreateDto) {
    const user = this.request.user as User;
    const journal = await this.journalsRepository.create({
      eventType: dto.eventType,
      date: new Date(),
      eventEntity: dto.eventEntity,
      entityName: dto.entityName,
      authorLogin: user.login,
      authorName: user.name
    });
    switch (dto.eventType) {
      case EventType.Create: if (dto.entityActual) {
        Promise.all(Object.entries(dto.entityActual).map(entry => {
          try {
            const entityField = ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]];
            if (entityField) return this.journalDetailRepository.create({
              journalId: journal.id,
              prevValue: null,
              actualValue: `${entry[1]}`,
              entityField
            })
          } catch { }
        }))
      }
        break;
      case EventType.Update: if (dto.entityActual && dto.entityOld) {
        Promise.all(Object.entries(dto.entityActual).map(entry => {
          try {
            const entityField = ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]];
            if (entityField) return this.journalDetailRepository.create({
              journalId: journal.id,
              prevValue: `${dto.entityOld[entry[0]] ?? null}`,
              actualValue: `${entry[1] ?? null}`,
              entityField
            })
          } catch { }
        }))
      }
        break;
      case EventType.Delete: if (dto.entityOld) {
        Promise.all(Object.entries(dto.entityOld).map(entry => {
          try {
            const entityField = ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]];
            if (entityField) return this.journalDetailRepository.create({
              journalId: journal.id,
              prevValue: `${entry[1] ?? null}`,
              entityField
            })
          } catch { }
        }))
      }
        break;
      case EventType.Link: if (dto.entityActual) {
        Promise.all(Object.entries(dto.entityActual).map(entry => {
          try {
            const entityField = ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]];
            if (entityField) return this.journalDetailRepository.create({
              journalId: journal.id,
              actualValue: `${entry[1] ?? null}`,
              entityField
            })
          } catch { }
        }))
      }
        break;
      case EventType.Unlink: if (dto.entityOld) {
        Promise.all(Object.entries(dto.entityOld).map(entry => {
          try {
            const entityField = ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]];
            if (entityField) return this.journalDetailRepository.create({
              journalId: journal.id,
              prevValue: `${entry[1] ?? null}`,
              entityField
            })
          } catch { }
        }))
      }
        break;
    }
  }

  async getPage(dto: JournalPageGetDto) {

    const whereOpt: WhereOptions<Journal> = [];
    if (dto.fromDate !== null || dto.toDate !== null) {
      const res = [];
      if (dto.fromDate !== null) {
        res.push({ [Op.gte]: new Date(dto.fromDate) });

      }
      if (dto.toDate !== null) {
        let tempDate = new Date(dto.toDate);
        tempDate.setHours(tempDate.getHours() + 24);
        res.push({ [Op.lt]: tempDate });
      }
      whereOpt.push({ date: { [Op.and]: res } });
    }

    const result = await this.journalsRepository.findAndCountAll({
      where: [...whereOpt], order: [['date', 'DESC']], limit: dto.size, offset: (dto.page - 1) * dto.size
    });

    return { total: result.count, data: result.rows }
  }

  async getDetails(id: number) {
    return await this.journalDetailRepository.findAll({ where: { journalId: id } });
  }

}

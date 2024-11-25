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
import { Op, WhereAttributeHashValue, WhereOptions } from 'sequelize';

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
            return this.journalDetailRepository.create({
              journalId: journal.id,
              prevValue: null,
              actualValue: `${entry[1]}`,
              entityField: ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]]
            })
          } catch { }
        }))
      }
        break;
      case EventType.Update: if (dto.entityActual && dto.entityOld) {
        Promise.all(Object.entries(dto.entityActual).map(entry => {
          try {
            if ((entry[1] ?? null) !== (dto.entityOld[entry[0]] ?? null)) {
              return this.journalDetailRepository.create({
                journalId: journal.id,
                prevValue: `${dto.entityOld[entry[0]] ?? null}`,
                actualValue: `${entry[1] ?? null}`,
                entityField: ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]]
              })
            }
          } catch { }
        }))
      }
        break;
      case EventType.Delete: if (dto.entityOld) {
        Promise.all(Object.entries(dto.entityOld).map(entry => {
          try {
            return this.journalDetailRepository.create({
              journalId: journal.id,
              prevValue: `${entry[1] ?? null}`,
              entityField: ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]]
            })
          } catch { }
        }))
      }
        break;
      case EventType.Link: if (dto.entityActual) {
        Promise.all(Object.entries(dto.entityActual).map(entry => {
          try {
            return this.journalDetailRepository.create({
              journalId: journal.id,
              actualValue: `${entry[1] ?? null}`,
              entityField: ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]]
            })
          } catch { }
        }))
      }
        break;
      case EventType.Unlink: if (dto.entityOld) {
        Promise.all(Object.entries(dto.entityOld).map(entry => {
          try {
            return this.journalDetailRepository.create({
              journalId: journal.id,
              prevValue: `${entry[1] ?? null}`,
              entityField: ENTITIES_FIELDS_KEYS[`${dto.eventEntity}`][entry[0]]
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
      whereOpt.push({ date: [] });
      if (dto.fromDate !== null) {
        whereOpt[0]['date'].push({ [Op.gte]: dto.fromDate });
      }
      if (dto.toDate !== null) {
        dto.toDate.setDate(dto.toDate.getDate() + 1)
        whereOpt[0]['date'].push({ [Op.lt]: dto.toDate });
      }
    }

    const result = await this.journalsRepository.findAndCountAll({
      where: [...whereOpt]
    })
  }

}

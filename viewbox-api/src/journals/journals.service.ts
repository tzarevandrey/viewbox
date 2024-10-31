import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journals.model';
import { JournalDetail } from './journals.details.model';

@Injectable()
export class JournalsService {

    constructor(
        @InjectModel(Journal) private journalsRepository: typeof Journal,
        @InjectModel(JournalDetail) private journalsDetailsRepository: typeof JournalDetail
    ) {}

    async addRecord() {
        
    }

}

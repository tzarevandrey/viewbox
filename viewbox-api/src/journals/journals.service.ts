import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journals.model';
import { JournalDetail } from './journals.details.model';
import { REQUEST } from '@nestjs/core';
import { User } from 'src/core/models/users.model';

@Injectable()
export class JournalsService {

    constructor(
        @InjectModel(Journal) private journalsRepository: typeof Journal,
        @InjectModel(JournalDetail) private journalsDetailsRepository: typeof JournalDetail,
        @Inject(REQUEST) private request
    ) {}

    async addRecord() {
        // console.log('req ' + this.request.user)
        const user = this.request.user as User;
        // console.log(user);
    }

}

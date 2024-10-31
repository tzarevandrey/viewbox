import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Journal } from './journals.model';
import { JournalDetail } from './journals.details.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [JournalsService],
  controllers: [JournalsController],
  imports: [
    SequelizeModule.forFeature([
      Journal,
      JournalDetail
    ]),
    JwtModule
  ],
  exports: [JournalsService]
})
export class JournalsModule {}

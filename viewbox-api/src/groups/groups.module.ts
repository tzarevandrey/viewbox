import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { GroupRole } from './groups.roles.model';
import { JwtModule } from '@nestjs/jwt';
import { JournalsModule } from 'src/journals/journals.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([
      Group,
      GroupRole
    ]),
    JwtModule,
    JournalsModule
  ]
})
export class GroupsModule { }

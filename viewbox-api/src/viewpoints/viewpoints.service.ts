import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';
import { JournalsService } from 'src/journals/journals.service';

@Injectable()
export class ViewpointsService {

  constructor(
    @InjectModel(Viewpoint) private viewpointRepository: typeof Viewpoint,
    private journalService: JournalsService
  ) { }

  async addViewpoint(dto: ViewpointCreateDto) {
    const viewpoint = await this.viewpointRepository.create(dto);
    return viewpoint;
  }

  async getAll() {
    const viewpoints = await this.viewpointRepository.findAll();
    await this.journalService.addRecord();
    return viewpoints;
  }

}

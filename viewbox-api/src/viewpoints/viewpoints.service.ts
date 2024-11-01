import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Viewpoint } from './viewpoints.model';
import { ViewpointCreateDto } from './dto/viewpoints.create.dto';

@Injectable()
export class ViewpointsService {

  constructor(
    @InjectModel(Viewpoint) private viewpointRepository: typeof Viewpoint
  ) { }

  async addViewpoint(dto: ViewpointCreateDto) {
    const viewpoint = await this.viewpointRepository.create(dto);
    return viewpoint;
  }

  async getAll() {
    const viewpoints = await this.viewpointRepository.findAll();
    return viewpoints;
  }

}

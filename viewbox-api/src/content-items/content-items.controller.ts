import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ContentItemCreateDto } from './dto/content-items.create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentItemsService } from './content-items.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ContentUpdateDto } from './dto/content-items.update.dto';

@UseGuards(JwtAuthGuard)
@Controller('content')
export class ContentItemsController {

  constructor(
    private contentService: ContentItemsService,
  ) { }

  @Get()
  async getAll() {
    return await this.contentService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.contentService.getOne(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async addContent(@Body() dto: ContentItemCreateDto, @UploadedFile() file?: any) {
    return await this.contentService.addContent(dto, file);
  }

  @Put()
  async update(@Body() cont: ContentUpdateDto) {
    return await this.contentService.updateContent(cont);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.contentService.deleteContent(id);
  }
}

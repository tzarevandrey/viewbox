import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JournalsService } from './journals.service';
import { JournalPageGetDto } from './dto/journals.get.page.dto';

@UseGuards(JwtAuthGuard)
@Controller('journal')
export class JournalsController {

  constructor(private journalService: JournalsService) { }

  @Post()
  async getPage(@Body() dto: JournalPageGetDto) {
    return await this.journalService.getPage(dto);
  }

  @Get('/:id')
  async getDetails(@Param('id') id: number) {
    return await this.journalService.getDetails(id);
  }

}

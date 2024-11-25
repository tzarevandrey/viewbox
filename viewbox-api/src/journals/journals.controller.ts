import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JournalsService } from './journals.service';
import { JournalPageGetDto } from './dto/journals.get.page.dto';

@UseGuards(JwtAuthGuard)
@Controller('journals')
export class JournalsController {

  constructor(private journalService: JournalsService) { }

  @Post()
  async getPage(@Body() dto: JournalPageGetDto) {
    return await this.journalService.getPage(dto);
  }

}

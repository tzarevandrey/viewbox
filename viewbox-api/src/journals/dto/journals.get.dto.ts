import { JournalPageGetDto } from './journals.get.page.dto';

export class JournalGetDto {
  total: number;
  data: JournalPageGetDto[];
}
export class JournalPageGetDto {
  page: number;
  size: number;
  fromDate: Date | null;
  toDate: Date | null;
}
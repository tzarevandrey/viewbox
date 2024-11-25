export type TGetJournalDto = {
  page: number;
  size: number;
  fromDate: Date | null;
  toDate: Date | null;
}
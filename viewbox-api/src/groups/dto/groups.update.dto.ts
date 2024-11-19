import { Role } from 'src/core/enums/roles.enum';

export class GroupUpdateDto {
  id: number;
  name: string;
  description?: string | null;
  roles?: Role[];
}
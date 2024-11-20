import { Role } from 'src/core/enums/roles.enum';

export class GroupCreateDto {
  name: string;
  description?: string | null;
  roles: Role[];
}
import { Role } from '../../../../core/enums/roles.enum';

export type TEditGroupDto = {
  id: number;
  name: string;
  description: string | null;
  roles: Role[];
}
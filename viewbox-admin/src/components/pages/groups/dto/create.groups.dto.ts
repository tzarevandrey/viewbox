import { Role } from '../../../../core/enums/roles.enum';

export type TCreateGroupDto = {
  name: string;
  description: string | null;
  roles: Role[];
}
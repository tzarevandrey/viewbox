import { Role } from '../../../../core/enums/roles.enum';

export type TGetGroupDto = {
  id: number;
  name: string;
  description: string | null;
  roles: { role: Role }[];
}
import { Role } from '../enums/roles.enum';

export type TGroup = {
  id: number;
  name: string;
  description: string | null;
  roles: { role: Role }[];
}
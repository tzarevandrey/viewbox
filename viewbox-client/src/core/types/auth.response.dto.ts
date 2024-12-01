import { Role } from "../enums/roles.enum";


export type TAuthResponseDto = {
  token: string;
  roles: Role[];
  expired: number | null;
}
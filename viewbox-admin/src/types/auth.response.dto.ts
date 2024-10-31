import { Role } from "../enums/roles.enum";


export interface TAuthResponseDto {
    token: string;
    roles: Role[];
    expired: Date | null;
}
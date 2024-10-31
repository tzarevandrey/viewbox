import { Role } from "src/core/enums/roles.enum";

export class AuthResponseDto {
    token: string;
    roles: Role[];
    expired: Date | null;
}
import { Role } from "../enums/roles.enum";

export class User {
    login: string;
    name: string | null;
    roles: Role[];
    expired: Date | null;
}
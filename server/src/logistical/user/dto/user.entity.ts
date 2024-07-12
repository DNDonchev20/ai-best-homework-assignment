import { Role } from "src/enums/role.enum";

export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: Role;
}

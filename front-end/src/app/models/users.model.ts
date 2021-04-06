import { Roles } from './roles.model';

export interface User {
    id: bigint;
    name: string;
    email: string;
    password: string;
    // tslint:disable-next-line:variable-name
    created_at: Date;
    // tslint:disable-next-line:variable-name
    updated_at: Date;
    roles: Roles[];
}

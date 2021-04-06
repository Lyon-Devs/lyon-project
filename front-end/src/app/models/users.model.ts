import { Roles } from './roles.model';

export class User {
    public id: bigint;
    public name: string;
    public email: string;
    public password: string;
    // tslint:disable-next-line:variable-name
    public created_at: Date;
    // tslint:disable-next-line:variable-name
    public updated_at: Date;
    public roles: Roles;
}

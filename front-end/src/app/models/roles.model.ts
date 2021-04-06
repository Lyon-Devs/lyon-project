export interface Roles {
    id: bigint;
    name: string;
    slug: string;
    description: string;
    system: boolean;
    // tslint:disable-next-line:variable-name
     created_at: Date;
    // tslint:disable-next-line:variable-name
    updated_at: Date;
}

import { ActingBranch } from './acting-branch.model';

export interface Clients {
    id: number;
    name: string;
    acting_branch: ActingBranch;
    created_at: Date;
    updated_at: Date;
}

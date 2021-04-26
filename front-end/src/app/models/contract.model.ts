import { Proposal } from './proposal.model';

export interface Contract {
    id: number;
    center_of_cost: string;
    contract_number: string;
    purchase_order: string;
    manager_lyon: string;
    manager_lyon_email: string;
    manager_client: string;
    manager_client_email: string;
    date_start: Date;
    date_end: Date;
    readjustment_base_date: Date;
    proposal_id: number;
    proposal: Proposal;
    created_at: Date;
    updated_at: Date;
}

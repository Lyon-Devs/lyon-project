import { Clients } from './clients.model';
import { Buyer } from '@models/buyer.model';
export interface Proposal {
    id: number;
    cod_lyon: string;
    created_at: Date;
    updated_at: Date;
    client_id: number;
    client: Clients;
    buyer: Buyer;
    date_request: Date;
    date_delivery_technique_proposal: Date;
    date_delivery_comercial_proposal: Date;
    number_client_request: string;
    months_exec: number;
    place_to_deploys_services: string;
}

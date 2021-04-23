export interface ProposalRevision {
    id: number;
    number_revision: number;
    data_committee: Date;
    type_price: 'global' | 'unity' | 'menu';
    medium_histogram: number;
    global_price: number;
    gross_margin: number;
    bdi: number;
    taxes: number;
    charge: number;
    type_warning: string;
    risks: string;
    financial_taxis: number;
    proposal_id: number;
}

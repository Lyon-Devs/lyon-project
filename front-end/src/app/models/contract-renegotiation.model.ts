export interface ContractRenegotiation {
    number_renegotiation: string;
    year: string;
    purchasing_period: Date;
    readjustment_base: 'parametric formula' | 'financial_index';
    required: number;
    approved: number;
}

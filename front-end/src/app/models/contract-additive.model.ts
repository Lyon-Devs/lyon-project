export interface ContractAdditive {
    number_additive: string;
    type: 'deadline' | 'value' | 'deadline_value' | 'others';
    date_start: Date;
    date_end: Date;
    value: number;
    description: string;
}

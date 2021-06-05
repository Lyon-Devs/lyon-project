<?php

namespace App\Imports;

use App\Models\Proposal;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class OldDataImport implements WithMultipleSheets
{

    public function sheets(): array
    {
        return [
            new ProposalImport(),
            new ProposalRevisionImport(),
            new ContractImport(),
            new ContractAdditivesImport(),
            new ContractRenegotiationImport()
        ];
    }
}

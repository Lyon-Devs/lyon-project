<?php

namespace App\Imports;

use App\Models\Contract;
use App\Models\Proposal;
use App\Models\ProposalUser;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ContractImport implements ToModel, WithHeadingRow
{
    public function startRow(): int
    {
        return 2;
    }
    public function model(array $model)
    {
        $data = \array_splice($model, 1, count($model) - 5);
        $proposal = Proposal::where('cod_lyon', $data['proposal_id'])->first();
        if (isset($proposal->id)) {
            $data['proposal_id'] = $proposal->id;
            $contract = new Contract($data);
            $contract->saveQuietly();
            return $contract;
        }
    }
}

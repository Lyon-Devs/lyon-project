<?php

namespace App\Imports;

use App\Models\Contract;
use App\Models\ContractAdditive;
use App\Models\ContractRenegotiation;
use App\Models\Proposal;
use App\Models\ProposalUser;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ContractRenegotiationImport implements ToModel, WithHeadingRow
{
    public function startRow(): int
    {
        return 2;
    }
    public function model(array $model)
    {
        $data = \array_splice($model, 1, count($model) - 4);
        // dd($data);
        $proposal = Proposal::where('cod_lyon', $data['contract_id'])->first();
        if (isset($proposal->id)) {
            $contract = Arr::first($proposal->contracts);
            if ($contract->id) {
                $data['contract_id'] = $contract->id;
                $contractRenegotiation = new ContractRenegotiation($data);
                $contractRenegotiation->saveQuietly();
                return $contractRenegotiation;
            }
        }
    }
}
